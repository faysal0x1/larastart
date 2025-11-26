<?php

declare(strict_types=1);

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Pos;
use App\Models\PosHold;
use App\Models\Product;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/pos/Index', [
            'title' => 'POS Dashboard',
        ]);
    }

    public function cart()
    {
		$product = Product::with(['category','subCategory', 'multiImages', 'colorImages' , 'colorImages.colorAttribute', 'variations'])
			->orderBy('created_at', 'desc')
			->whereId(2)
			->get();

        return Inertia::render('admin/pos/Cart', [
            'title' => 'POS Cart',
			'product' => $product,
        ]);
    }

    public function reports()
    {
        return Inertia::render('admin/pos/Reports', [
            'title' => 'POS Reports',
        ]);
    }

    public function holdList()
    {
        $holds = PosHold::where('user_id', auth()->id())
            ->with(['customer', 'store'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/pos/HoldList', [
            'title' => 'Hold List',
            'holds' => $holds,
        ]);
    }

    public function recentTransactions()
    {
        $transactions = Pos::with(['contact', 'items.product'])
            ->where('company_id', auth()->user()->company_id)
            ->orderBy('created_at', 'desc')
            ->take(50)
            ->get();

        return Inertia::render('admin/pos/RecentTransactions', [
            'title' => 'Recent Transactions',
            'transactions' => $transactions,
        ]);
    }
}
