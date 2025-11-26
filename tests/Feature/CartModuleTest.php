<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartModuleTest extends TestCase
{
    use RefreshDatabase;

    public function test_cart_show_endpoint_works(): void
    {
        $res = $this->getJson('/api/cart');
        $res->assertStatus(200);
        $res->assertJsonStructure(['id', 'subtotal', 'total', 'items']);
    }

    public function test_cart_add_item(): void
    {
        $res = $this->postJson('/api/cart/add', ['product_id' => 1, 'quantity' => 2]);
        $res->assertStatus(200);
        $res->assertJsonStructure(['id', 'items']);
    }
}
