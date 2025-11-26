<?php

declare (strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->nullable();

            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('subcategory_id')->nullable();
            $table->unsignedBigInteger('child_category_id')->nullable();

            $table->string('name');
            $table->string('slug');

            $table->string('type')->nullable();

            $table->string('sku')->unique();

            $table->string('qty');
            $table->longText('tags')->nullable();
            $table->string('size')->nullable();
            // $table->string('product_color')->nullable();
            $table->string('stock')->nullable();

            $table->integer('unit_price');
            $table->string('discount_type')->nullable();
            $table->string('discount_price')->nullable();
            $table->string('product_tax')->nullable();
            $table->boolean('tax_calculation')->nullable()->comment('0 = Exclusive, 1 = Inclusive');

            $table->decimal('final_price', 10, 2)->nullable();

            $table->text('short_descp')->nullable();
            $table->text('long_descp');
            $table->longText('key_features')->nullable();
            $table->string('product_thumbnail');

            $table->tinyInteger('hot_deals')->default(0)->nullable();
            $table->boolean('featured')->default(0)->nullable();

            $table->boolean('special_offer')->default(0)->nullable();
            $table->boolean('special_deals')->default(0)->nullable();

            $table->tinyInteger('status')->default(1);

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('subcategory_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('child_category_id')->references('id')->on('categories')->onDelete('set null');


            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('products');
    }
};
