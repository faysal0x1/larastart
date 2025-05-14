<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('blogs', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('blog_category_id');
			$table->unsignedBigInteger('created_by');
			$table->string('title');
			$table->string('slug')->unique();
			$table->string('featured_image')->nullable();
			$table->text('summary')->nullable(); // Short description/excerpt
			$table->longText('content');
			$table->integer('views')->default(0);
			$table->boolean('is_featured')->default(false);
			$table->dateTime('published_at')->nullable();
			$table->tinyInteger('status')->default(0)->comment('0=draft, 1=published, 2=archived');

			// SEO fields
			$table->string('meta_title')->nullable();
			$table->text('meta_description')->nullable();
			$table->string('meta_keywords')->nullable();
			$table->text('og_image')->nullable();

			// Foreign keys
			$table->foreign('blog_category_id')->references('id')->on('blog_categories')->onDelete('cascade');
			$table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

			$table->timestamps();
			$table->softDeletes();

			// Indexing for better performance
			$table->index(['blog_category_id', 'created_by', 'status', 'published_at']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists('blogs');
	}
};
