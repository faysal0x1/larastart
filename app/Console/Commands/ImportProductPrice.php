<?php
namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportProductPrice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-product-price';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import product qty and price from public/json/product_stocks.json into products table (final_price, qty)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $jsonPath = base_path('public/json/product_stocks.json');

        if (! File::exists($jsonPath)) {
            $this->error("JSON file not found: {$jsonPath}");
            return self::FAILURE;
        }

        $this->info('Reading JSON...');
        $contents = File::get($jsonPath);

        $decoded = json_decode($contents, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Failed to decode JSON: ' . json_last_error_msg());
            return self::FAILURE;
        }

        // The phpMyAdmin export format is an array of records; one of them is the
        // table descriptor with key 'data' that contains the actual rows.
        // Example:
        // [ {"type":"header", ...}, {"type":"database", ...}, {"type":"table","name":"product_stocks", "data": [ ... rows ... ]} ]
        $dataRows = [];
        if (is_array($decoded)) {
            // Case 1: Root has a 'data' field directly
            if (isset($decoded['data']) && is_array($decoded['data'])) {
                $dataRows = $decoded['data'];
            } else {
                // Case 2: Root is a list; find the table entry for product_stocks
                foreach ($decoded as $entry) {
                    if (! is_array($entry)) {
                        continue;
                    }
                    $isTable       = ($entry['type'] ?? null) === 'table';
                    $isTargetTable = ($entry['name'] ?? null) === 'product_stocks';
                    if ($isTable && $isTargetTable && isset($entry['data']) && is_array($entry['data'])) {
                        $dataRows = $entry['data'];
                        break;
                    }
                }
            }
        }

        if (empty($dataRows)) {
            $this->warn('No product stock data found in JSON. Nothing to import.');
            return self::SUCCESS;
        }

        $this->info('Updating products using ORM...');
        $updatedCount   = 0;
        $unchangedCount = 0;
        $skippedCount   = 0;

        foreach ($dataRows as $row) {
            if (! is_array($row)) {
                continue;
            }

            $productId = isset($row['product_id']) ? (int) $row['product_id'] : null;
            if (empty($productId)) {
                $skippedCount++;
                $this->warn('Skipped row: missing product_id');
                continue;
            }

            $qtyRaw   = $row['qty'] ?? null;
            $priceRaw = $row['price'] ?? null;

//            $qty = is_null($qtyRaw) ? null : (string) $qtyRaw;

//            $price = null;
//            if (! is_null($priceRaw) && $priceRaw !== '') {
//                $price = number_format((float) $priceRaw, 2, '.', '');
//            }

            $product = Product::query()->find($productId);

            if (! $product) {
                $skippedCount++;
                $this->warn('Product not found. ID: ' . $productId . ' — skipped');
                continue;
            }

            $oldPrice = $product->final_price;
            $oldQty   = $product->qty;

            // Normalize and cast values
            $normalizedPrice = null;
            if ($priceRaw !== '' && $priceRaw !== null) {
                $normalizedPrice = number_format((float) $priceRaw, 2, '.', '');
            }

            $normalizedQty = null;
            if ($qtyRaw !== '' && $qtyRaw !== null) {
                $normalizedQty = (int) $qtyRaw;
            }

            $product->final_price = $normalizedPrice;
            $product->unit_price  = $normalizedPrice;
            $product->qty         = $normalizedQty;

//            if ($product->isDirty(['final_price', 'qty'])) {
            $product->save();
            $updatedCount++;
            $this->info(
                'Updated product ' . $productId
                . ' | final_price: ' . (is_null($oldPrice) ? 'NULL' : $oldPrice)
                . ' -> ' . (is_null($priceRaw) ? 'NULL' : $priceRaw)
                . ' | qty: ' . (is_null($oldQty) ? 'NULL' : $oldQty)
                . ' -> ' . (is_null($qtyRaw) ? 'NULL' : $qtyRaw)
            );

        }

        $this->info('Import complete. Updated: ' . $updatedCount . ', Unchanged: ' . $unchangedCount . ', Skipped: ' . $skippedCount . '.');
        return self::SUCCESS;
    }
}
