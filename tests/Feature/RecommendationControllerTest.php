<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecommendationControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_recommendations_endpoint_returns_200(): void
    {
        $response = $this->getJson('/api/recommendations?context=home&limit=3');
        $response->assertStatus(200);
        $response->assertJsonIsArray();
    }

    public function test_controller_accepts_product_ids_array(): void
    {
        $response = $this->getJson('/api/recommendations?context=cart&limit=5&product_ids[]=1&product_ids[]=2&algorithm=fbt_v1');
        $response->assertStatus(200);
        $response->assertHeader('X-Recommendation-Id');
    }
}
