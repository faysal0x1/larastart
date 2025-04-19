<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		// Config
		$totalPosts = 1000;
		$chunkSize = 300;

		// Get user IDs directly from DB to avoid loading all user models
		$userIds = DB::table('users')->pluck('id')->toArray();

		if (empty($userIds)) {
			$this->command->error('No users found. Please run the UserSeeder first.');
			return;
		}

		// Disable query log to save memory
		DB::disableQueryLog();

		// Create posts in smaller chunks
		for ($offset = 0; $offset < $totalPosts; $offset += $chunkSize) {
			$limit = min($chunkSize, $totalPosts - $offset);
			$this->command->info('Creating posts ' . ($offset + 1) . ' to ' . ($offset + $limit));

			$postsData = [];

			for ($i = 1; $i <= $limit; $i++) {
				$currentIndex = $offset + $i;
				$randUserId = $userIds[array_rand($userIds)];
				$publishDate = rand(0, 4) > 0 ? date('Y-m-d H:i:s', strtotime('-' . rand(1, 100) . ' days')) : null;
				$createdAt = date('Y-m-d H:i:s', strtotime('-' . rand(1, 120) . ' days'));
				$updatedAt = date('Y-m-d H:i:s', strtotime('-' . rand(0, 30) . ' days'));

				$postsData[] = [
					'title' => "Post Title $currentIndex",
					'body' => "This is the content for post $currentIndex. It contains detailed information about the topic discussed.",
					'user_id' => $randUserId,
					'published_at' => $publishDate,
					'created_at' => $createdAt,
					'updated_at' => $updatedAt,
				];
			}

			// Bulk insert with a raw query
			DB::table('posts')->insert($postsData);

			// Clear data to free memory
			unset($postsData);

			// Force garbage collection
			if (function_exists('gc_collect_cycles')) {
				gc_collect_cycles();
			}
		}

		// Handle soft deletes in separate, smaller batches if needed
		if ($this->command->confirm('Do you want to soft delete approximately 10% of posts?', true)) {
			$this->command->info('Soft deleting approximately 10% of posts...');

			$toDelete = (int)($totalPosts * 0.1);
			$deleteBatchSize = 100;

			for ($i = 0; $i < $toDelete; $i += $deleteBatchSize) {
				$limit = min($deleteBatchSize, $toDelete - $i);

				// Get random post IDs
				$postIds = DB::table('posts')
					->whereNull('deleted_at')
					->inRandomOrder()
					->limit($limit)
					->pluck('id');

				if ($postIds->isEmpty()) {
					break;
				}

				// Update with raw query to set deleted_at
				DB::table('posts')
					->whereIn('id', $postIds)
					->update(['deleted_at' => Carbon::now()]);

				// Free memory
				unset($postIds);

				if (function_exists('gc_collect_cycles')) {
					gc_collect_cycles();
				}
			}
		}

		$this->command->info("Seeding completed successfully. Created $totalPosts posts.");
	}
}