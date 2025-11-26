<?php
namespace Tests\Unit;

use App\Services\Recommendation\Algorithms\FrequentlyBoughtTogetherAlgorithm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class FrequentlyBoughtTogetherAlgorithmTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_empty_without_seed(): void
    {
        $algo = new FrequentlyBoughtTogetherAlgorithm();
        $this->assertCount(0, $algo->recommend([], 5));
    }

    public function test_recommends_from_copurchase(): void
    {
        DB::table('product_copurchase')->insert([
            ['product_id' => 1, 'copurchased_product_id' => 2, 'count' => 3, 'score' => 3],
            ['product_id' => 1, 'copurchased_product_id' => 3, 'count' => 2, 'score' => 2],
        ]);

        $algo = new FrequentlyBoughtTogetherAlgorithm();
        $res  = $algo->recommend(['product_id' => 1], 5);
        $this->assertGreaterThanOrEqual(1, $res->count());
        $this->assertEquals('fbt_v1', $res->first()['algorithm']);
    }
}
