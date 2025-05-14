<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();
			$table->unsignedBigInteger('blog_id');
			$table->unsignedBigInteger('user_id')->nullable(); // Allow guest comments with null user_id
			$table->unsignedBigInteger('parent_id')->nullable(); // For nested comments
			$table->text('content');
			$table->string('author_name')->nullable(); // For guest comments
			$table->string('author_email')->nullable(); // For guest comments
			$table->string('author_ip')->nullable();
			$table->tinyInteger('status')->default(0)->comment('0=pending, 1=approved, 2=spam');

			$table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade');
			$table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
			$table->foreign('parent_id')->references('id')->on('blog_comments')->onDelete('cascade');

			$table->timestamps();
			$table->index(['blog_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_comments');
    }
};
