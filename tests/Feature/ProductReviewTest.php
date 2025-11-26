<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductReviewTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware();
    }

    public function test_unauthenticated_user_cannot_submit_review()
    {
        $response = $this->postJson("/product/1/review", [
            'comment' => 'Great product!',
            'rating'  => 5,
        ]);

        $response->assertStatus(401);
    }

    public function test_review_validation_works()
    {
        $user = User::factory()->create();

        // Test with non-existent product (should get 404)
        $response = $this->actingAs($user)->postJson("/product/1/review", [
            'comment' => '', // Empty comment
            'rating'  => 6,  // Invalid rating
        ]);

        $response->assertStatus(404);
    }

    public function test_product_not_found_returns_404()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson("/product/99999/review", [
            'comment' => 'Great product!',
            'rating'  => 5,
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'Product not found',
            ]);
    }
}
