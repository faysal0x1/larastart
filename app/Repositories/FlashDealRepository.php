<?php

declare(strict_types=1);

// app/Repositories/FlashDealRepository.php

namespace App\Repositories;

use App\Models\FlashDeal;
use App\Models\FlashDealProduct;
use App\Repositories\Interfaces\FlashDealRepositoryInterface;
use App\Traits\ImageHandlerTrait;
use Illuminate\Database\Eloquent\Model;

class FlashDealRepository extends BaseRepository
{
    use ImageHandlerTrait;

    public function __construct(FlashDeal $model) {
        parent::__construct($model);
        $this->setImageConfig([
            'storage_path' => 'images/flash-deals',
        ]);
    }

    public function create(array $data): Model {
        // Handle image upload if present
        if (isset($data['image']) && $data['image']) {
            $data['image'] = $this->handleImageUpload($data['image']);
        }

        return parent::create($data);
    }

    public function update(array $data, int $id): FlashDeal {
        $flashdeal = FlashDeal::find($id);

        if (isset($data['image']) && $data['image']) {
            $this->deleteImage($flashdeal->image);
            $data['image'] = $this->handleImageUpload($data['image']);
        }

        parent::update($data, $id);
    }


    public function delete(int $id): bool {
        $flashdeal = FlashDeal::find($id);

        // Delete associated image if exists
        $this->deleteImage($flashdeal->image);

        return parent::delete($id);
    }

    public function addProductToFlashDeal(array $data, int $id) {
        $flashdeal = $this->find($id);

        if (!$flashdeal) {
            throw new \RuntimeException('FlashDeal not found');
        }

        // First, delete existing flash deal products for this flash deal
        FlashDealProduct::where('flash_deal_id', $id)->delete();

        // Then create new records for each product ID
        $productData = [];
        foreach ($data['product_ids'] as $productId) {
            $productData[] = [
                'flash_deal_id' => $id,
                'product_id' => $productId,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert all products at once for better performance
        FlashDealProduct::insert($productData);

        return $flashdeal;
    }

    public function getProductsForFlashDeal(int $id) {
        $flashdeal = $this->find($id);

        if (!$flashdeal) {
            throw new \RuntimeException('FlashDeal not found');
        }

        return $flashdeal->flashDealProducts()
            ->with('product')
            ->get()
            ->pluck('product');
    }

    protected function getSearchableFields(): array {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array {
        return ['name', 'created_at'];
    }
}
