<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostTagSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		// Config
		$postsPerChunk = 200;
		$tagsPerPost = 3; // Average number of tags per post

		// Disable query log to save memory
		DB::disableQueryLog();

		// Get the total number of posts and tags
		$postCount = DB::table('posts')->count();
		$tagCount = DB::table('tags')->count();

		if ($postCount == 0 || $tagCount == 0) {
			$this->command->error('Posts or tags not found. Please run PostSeeder and TagSeeder first.');
			return;
		}

		$this->command->info("Found $postCount posts and $tagCount tags");

		// Get all tag IDs
		$tagIds = DB::table('tags')->pluck('id')->toArray();

		// Process in chunks to reduce memory usage
		$totalProcessed = 0;

		while ($totalProcessed < $postCount) {
			// Get a chunk of post IDs
			$postIds = DB::table('posts')
				->select('id')
				->orderBy('id')
				->skip($totalProcessed)
				->take($postsPerChunk)
				->pluck('id')
				->toArray();

			if (empty($postIds)) {
				break;
			}

			$chunkSize = count($postIds);
			$this->command->info('Processing posts ' . ($totalProcessed + 1) . ' to ' . ($totalProcessed + $chunkSize));

			$pivotRecords = [];

			// For each post in this chunk
			foreach ($postIds as $postId) {
				// Assign a random number of tags (1 to 5) to each post
				$numTags = rand(1, 5);
				$selectedTagIds = array_rand(array_flip($tagIds), min($numTags, $tagCount));

				if (!is_array($selectedTagIds)) {
					$selectedTagIds = [$selectedTagIds];
				}

				foreach ($selectedTagIds as $tagId) {
					$pivotRecords[] = [
						'post_id' => $postId,
						'tag_id' => $tagId,
						'created_at' => now(),
						'updated_at' => now(),
					];

					// Insert in smaller batches to avoid memory issues
					if (count($pivotRecords) >= 100) {
						DB::table('post_tag')->insert($pivotRecords);
						$pivotRecords = [];
					}
				}
			}

			// Insert any remaining records
			if (!empty($pivotRecords)) {
				DB::table('post_tag')->insert($pivotRecords);
			}

			// Update progress and free memory
			$totalProcessed += $chunkSize;
			unset($postIds, $pivotRecords);

			if (function_exists('gc_collect_cycles')) {
				gc_collect_cycles();
			}
		}

		$this->command->info('Post-Tag relationships seeded successfully.');
	}
}