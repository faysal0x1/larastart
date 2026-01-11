<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BannerController;
use App\Modules\Blog\Http\Controllers\BlogCategoryController;
use App\Modules\Blog\Http\Controllers\BlogController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\BusinessInfoController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ChildControllerController;
use App\Http\Controllers\Admin\ColorAttributeController;
use App\Http\Controllers\Admin\CompareController;
use App\Http\Controllers\Admin\ConversationController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\DealOfTheDayController;
use App\Http\Controllers\Admin\FaqQuestionController;
use App\Http\Controllers\Admin\FlashDealController;
use App\Modules\MarketingService\Http\Controllers\MarketingServiceController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OrderTypeController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductVariationController;
use App\Modules\SiteSeo\Http\Controllers\SiteSeoController;
use App\Modules\SiteSetting\Http\Controllers\SiteSettingController;
use App\Modules\StaticPage\Http\Controllers\StaticPageController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\UserAddressController;
use App\Http\Controllers\Admin\WishlistController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->group(function () {

        // ========================================
        // CONTENT MANAGEMENT ROUTES
        // ========================================

        // Blog Management routes are now in Blog module (Modules/Blog/routes/admin.php)

        Route::get('post', [PostController::class, 'index'])->name('post.index');
        Route::get('post/create', [PostController::class, 'create'])->name('post.create');
        Route::post('post', [PostController::class, 'store'])->name('post.store');
        Route::get('post/{post}', [PostController::class, 'show'])->name('post.show');
        Route::get('post/{post}/edit', [PostController::class, 'edit'])->name('post.edit');
        Route::post('post/{post}', [PostController::class, 'update'])->name('post.update');
        Route::delete('post/{post}', [PostController::class, 'destroy'])->name('post.destroy');

        Route::get('tag', [TagController::class, 'index'])->name('tag.index');
        Route::get('tag/create', [TagController::class, 'create'])->name('tag.create');
        Route::post('tag', [TagController::class, 'store'])->name('tag.store');
        Route::get('tag/{tag}', [TagController::class, 'show'])->name('tag.show');
        Route::get('tag/{tag}/edit', [TagController::class, 'edit'])->name('tag.edit');
        Route::post('tag/{tag}', [TagController::class, 'update'])->name('tag.update');
        Route::delete('tag/{tag}', [TagController::class, 'destroy'])->name('tag.destroy');

        // ========================================
        // PRODUCT MANAGEMENT ROUTES
        // ========================================

        // Product Categories
        Route::get('category', [CategoryController::class, 'index'])->name('category.index');
        Route::get('category/create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('category', [CategoryController::class, 'store'])->name('category.store');
        Route::delete('category/batch-delete', [CategoryController::class, 'batchDelete'])->name('category.batch-delete');
        Route::get('category/{category}', [CategoryController::class, 'show'])->name('category.show');
        Route::get('category/{category}/edit', [CategoryController::class, 'edit'])->name('category.edit');
        Route::put('category/{category}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

        Route::get('sub-category', [SubCategoryController::class, 'index'])->name('sub-category.index');
        Route::get('sub-category/create', [SubCategoryController::class, 'create'])->name('sub-category.create');
        Route::post('sub-category', [SubCategoryController::class, 'store'])->name('sub-category.store');
        Route::delete('sub-category/batch-delete', [SubCategoryController::class, 'batchDelete'])->name('sub-category.batch-delete');
        Route::get('sub-category/{sub_category}', [SubCategoryController::class, 'show'])->name('sub-category.show');
        Route::get('sub-category/{sub_category}/edit', [SubCategoryController::class, 'edit'])->name('sub-category.edit');
        Route::post('sub-category/{sub_category}', [SubCategoryController::class, 'update'])->name('sub-category.update');
        Route::delete('sub-category/{sub_category}', [SubCategoryController::class, 'destroy'])->name('sub-category.destroy');

        Route::get('child-category', [ChildControllerController::class, 'index'])->name('child-category.index');
        Route::get('child-category/create', [ChildControllerController::class, 'create'])->name('child-category.create');
        Route::post('child-category', [ChildControllerController::class, 'store'])->name('child-category.store');
        Route::delete('child-category/batch-delete', [ChildControllerController::class, 'batchDelete'])->name('child-category.batch-delete');
        Route::get('child-category/{child_category}', [ChildControllerController::class, 'show'])->name('child-category.show');
        Route::get('child-category/{child_category}/edit', [ChildControllerController::class, 'edit'])->name('child-category.edit');
        Route::post('child-category/{child_category}', [ChildControllerController::class, 'update'])->name('child-category.update');
        Route::delete('child-category/{child_category}', [ChildControllerController::class, 'destroy'])->name('child-category.destroy');

        // Products
        Route::get('product', [ProductController::class, 'index'])->name('product.index');
        Route::get('product/create', [ProductController::class, 'create'])->name('product.create');
        Route::post('product', [ProductController::class, 'store'])->name('product.store');
        Route::delete('product/batch-delete', [ProductController::class, 'batchDelete'])->name('product.batch-delete');
        Route::get('product/all', [ProductController::class, 'all'])->name('product.all');
        Route::get('product/{product}/basic', [ProductController::class, 'basic'])->name('product.basic');
        Route::get('product/bulk-edit', [ProductController::class, 'bulkEdit'])->name('product.bulk.edit');
        Route::post('product/bulk-update', [ProductController::class, 'bulkUpdate'])->name('product.bulk.update');
        Route::get('product/{product}', [ProductController::class, 'show'])->name('product.show');
        Route::get('product/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
        Route::post('product/{product}', [ProductController::class, 'update'])->name('product.update');
        Route::delete('product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');

        Route::match(['delete', 'post'], 'product/{product}/images', [ProductController::class, 'deleteImages'])->name('product.images.delete');

        Route::get('product-variation', [ProductVariationController::class, 'index'])->name('product-variation.index');
        Route::get('product-variation/create', [ProductVariationController::class, 'create'])->name('product-variation.create');
        Route::post('product-variation', [ProductVariationController::class, 'store'])->name('product-variation.store');
        Route::get('product-variation/{product_variation}', [ProductVariationController::class, 'show'])->name('product-variation.show');
        Route::get('product-variation/{product_variation}/edit', [ProductVariationController::class, 'edit'])->name('product-variation.edit');
        Route::post('product-variation/{product_variation}', [ProductVariationController::class, 'update'])->name('product-variation.update');
        Route::delete('product-variation/{product_variation}', [ProductVariationController::class, 'destroy'])->name('product-variation.destroy');

        // Product Attributes
        Route::get('brand', [BrandController::class, 'index'])->name('brand.index');
        Route::get('brand/create', [BrandController::class, 'create'])->name('brand.create');
        Route::post('brand', [BrandController::class, 'store'])->name('brand.store');
        Route::delete('brand/batch-delete', [BrandController::class, 'batchDelete'])->name('brand.batch-delete');
        Route::get('brand/{brand}', [BrandController::class, 'show'])->name('brand.show');
        Route::get('brand/{brand}/edit', [BrandController::class, 'edit'])->name('brand.edit');
        Route::post('brand/{brand}', [BrandController::class, 'update'])->name('brand.update');
        Route::delete('brand/{brand}', [BrandController::class, 'destroy'])->name('brand.destroy');

        Route::get('color-attribute', [ColorAttributeController::class, 'index'])->name('color-attribute.index');
        Route::get('color-attribute/create', [ColorAttributeController::class, 'create'])->name('color-attribute.create');
        Route::post('color-attribute', [ColorAttributeController::class, 'store'])->name('color-attribute.store');
        Route::get('color-attribute/{color_attribute}', [ColorAttributeController::class, 'show'])->name('color-attribute.show');
        Route::get('color-attribute/{color_attribute}/edit', [ColorAttributeController::class, 'edit'])->name('color-attribute.edit');
        Route::post('color-attribute/{color_attribute}', [ColorAttributeController::class, 'update'])->name('color-attribute.update');
        Route::delete('color-attribute/{color_attribute}', [ColorAttributeController::class, 'destroy'])->name('color-attribute.destroy');

        // ========================================
        // MARKETING & PROMOTIONS ROUTES
        // ========================================

        // Sliders & Banners
        Route::get('slider', [SliderController::class, 'index'])->name('slider.index');
        Route::get('slider/create', [SliderController::class, 'create'])->name('slider.create');
        Route::post('slider', [SliderController::class, 'store'])->name('slider.store');
        Route::get('slider/{slider}', [SliderController::class, 'show'])->name('slider.show');
        Route::get('slider/{slider}/edit', [SliderController::class, 'edit'])->name('slider.edit');
        Route::post('slider/{slider}', [SliderController::class, 'update'])->name('slider.update');
        Route::delete('slider/{slider}', [SliderController::class, 'destroy'])->name('slider.destroy');

        Route::get('banner', [BannerController::class, 'index'])->name('banner.index');
        Route::get('banner/create', [BannerController::class, 'create'])->name('banner.create');
        Route::post('banner', [BannerController::class, 'store'])->name('banner.store');
        Route::get('banner/{banner}', [BannerController::class, 'show'])->name('banner.show');
        Route::get('banner/{banner}/edit', [BannerController::class, 'edit'])->name('banner.edit');
        Route::post('banner/{banner}', [BannerController::class, 'update'])->name('banner.update');
        Route::delete('banner/{banner}', [BannerController::class, 'destroy'])->name('banner.destroy');

        // Deals & Coupons
        Route::get('flash-deal', [FlashDealController::class, 'index'])->name('flash-deal.index');
        Route::get('flash-deal/create', [FlashDealController::class, 'create'])->name('flash-deal.create');
        Route::post('flash-deal', [FlashDealController::class, 'store'])->name('flash-deal.store');
        Route::get('flash-deal/{flash_deal}', [FlashDealController::class, 'show'])->name('flash-deal.show');
        Route::get('flash-deal/{flash_deal}/edit', [FlashDealController::class, 'edit'])->name('flash-deal.edit');
        Route::post('flash-deal/{flash_deal}', [FlashDealController::class, 'update'])->name('flash-deal.update');
        Route::delete('flash-deal/{flash_deal}', [FlashDealController::class, 'destroy'])->name('flash-deal.destroy');

        Route::get('deal-of-the-day', [DealOfTheDayController::class, 'index'])->name('deal-of-the-day.index');
        Route::get('deal-of-the-day/create', [DealOfTheDayController::class, 'create'])->name('deal-of-the-day.create');
        Route::post('deal-of-the-day', [DealOfTheDayController::class, 'store'])->name('deal-of-the-day.store');
        Route::get('deal-of-the-day/{deal_of_the_day}', [DealOfTheDayController::class, 'show'])->name('deal-of-the-day.show');
        Route::get('deal-of-the-day/{deal_of_the_day}/edit', [DealOfTheDayController::class, 'edit'])->name('deal-of-the-day.edit');
        Route::post('deal-of-the-day/{deal_of_the_day}', [DealOfTheDayController::class, 'update'])->name('deal-of-the-day.update');
        Route::delete('deal-of-the-day/{deal_of_the_day}', [DealOfTheDayController::class, 'destroy'])->name('deal-of-the-day.destroy');

        Route::get('deal-of-the-day/{deal_of_the_day}/add-product', [DealOfTheDayController::class, 'addProduct'])->name('deal-of-the-day.add-product');
        Route::post('deal-of-the-day/{deal_of_the_day}/add-product', [DealOfTheDayController::class, 'storeProducts'])->name('deal-of-the-day.store-products');
        Route::put('deal-of-the-day/{deal_of_the_day}/products/{product}', [DealOfTheDayController::class, 'updateProduct'])->name('deal-of-the-day.update-product');
        Route::delete('deal-of-the-day/{deal_of_the_day}/products/{product}', [DealOfTheDayController::class, 'removeProduct'])->name('deal-of-the-day.remove-product');

        Route::get('coupon', [CouponController::class, 'index'])->name('coupon.index');
        Route::get('coupon/create', [CouponController::class, 'create'])->name('coupon.create');
        Route::post('coupon', [CouponController::class, 'store'])->name('coupon.store');
        Route::get('coupon/{coupon}', [CouponController::class, 'show'])->name('coupon.show');
        Route::get('coupon/{coupon}/edit', [CouponController::class, 'edit'])->name('coupon.edit');
        Route::post('coupon/{coupon}', [CouponController::class, 'update'])->name('coupon.update');
        Route::delete('coupon/{coupon}', [CouponController::class, 'destroy'])->name('coupon.destroy');

        // ========================================
        // USER INTERACTION ROUTES
        // ========================================

        // User Lists & Interactions
        Route::get('wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
        Route::get('wishlist/create', [WishlistController::class, 'create'])->name('wishlist.create');
        Route::post('wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
        Route::get('wishlist/{wishlist}', [WishlistController::class, 'show'])->name('wishlist.show');
        Route::get('wishlist/{wishlist}/edit', [WishlistController::class, 'edit'])->name('wishlist.edit');
        Route::post('wishlist/{wishlist}', [WishlistController::class, 'update'])->name('wishlist.update');
        Route::delete('wishlist/{wishlist}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

        Route::get('compare', [CompareController::class, 'index'])->name('compare.index');
        Route::get('compare/create', [CompareController::class, 'create'])->name('compare.create');
        Route::post('compare', [CompareController::class, 'store'])->name('compare.store');
        Route::get('compare/{compare}', [CompareController::class, 'show'])->name('compare.show');
        Route::get('compare/{compare}/edit', [CompareController::class, 'edit'])->name('compare.edit');
        Route::post('compare/{compare}', [CompareController::class, 'update'])->name('compare.update');
        Route::delete('compare/{compare}', [CompareController::class, 'destroy'])->name('compare.destroy');

        Route::get('conversation', [ConversationController::class, 'index'])->name('conversation.index');
        Route::get('conversation/create', [ConversationController::class, 'create'])->name('conversation.create');
        Route::post('conversation', [ConversationController::class, 'store'])->name('conversation.store');
        Route::get('conversation/{conversation}', [ConversationController::class, 'show'])->name('conversation.show');
        Route::get('conversation/{conversation}/edit', [ConversationController::class, 'edit'])->name('conversation.edit');
        Route::post('conversation/{conversation}', [ConversationController::class, 'update'])->name('conversation.update');
        Route::delete('conversation/{conversation}', [ConversationController::class, 'destroy'])->name('conversation.destroy');

        // Location management routes moved to Location module

        // ========================================
        // ORDER MANAGEMENT ROUTES
        // ========================================

        Route::get('order', [OrderController::class, 'index'])->name('order.index');
        Route::get('order/create', [OrderController::class, 'create'])->name('order.create');
        Route::post('order', [OrderController::class, 'store'])->name('order.store');
        Route::get('order/{order}', [OrderController::class, 'show'])->name('order.show');
        Route::get('order/{order}/edit', [OrderController::class, 'edit'])->name('order.edit');
        Route::post('order/{order}', [OrderController::class, 'update'])->name('order.update');
        Route::delete('order/{order}', [OrderController::class, 'destroy'])->name('order.destroy');

        Route::get('order-type', [OrderTypeController::class, 'index'])->name('order-type.index');
        Route::get('order-type/create', [OrderTypeController::class, 'create'])->name('order-type.create');
        Route::post('order-type', [OrderTypeController::class, 'store'])->name('order-type.store');
        Route::get('order-type/{order_type}', [OrderTypeController::class, 'show'])->name('order-type.show');
        Route::get('order-type/{order_type}/edit', [OrderTypeController::class, 'edit'])->name('order-type.edit');
        Route::post('order-type/{order_type}', [OrderTypeController::class, 'update'])->name('order-type.update');
        Route::delete('order-type/{order_type}', [OrderTypeController::class, 'destroy'])->name('order-type.destroy');

        Route::get('product-cart', [ProductCartController::class, 'index'])->name('product-cart.index');
        Route::get('product-cart/create', [ProductCartController::class, 'create'])->name('product-cart.create');
        Route::post('product-cart', [ProductCartController::class, 'store'])->name('product-cart.store');
        Route::get('product-cart/{product_cart}', [ProductCartController::class, 'show'])->name('product-cart.show');
        Route::get('product-cart/{product_cart}/edit', [ProductCartController::class, 'edit'])->name('product-cart.edit');
        Route::post('product-cart/{product_cart}', [ProductCartController::class, 'update'])->name('product-cart.update');
        Route::delete('product-cart/{product_cart}', [ProductCartController::class, 'destroy'])->name('product-cart.destroy');

        // ========================================
        // SYSTEM SETTINGS ROUTES
        // ========================================

        Route::get('site-setting', [SiteSettingController::class, 'index'])->name('site-setting.index');
        Route::get('site-setting/create', [SiteSettingController::class, 'create'])->name('site-setting.create');
        Route::post('site-setting', [SiteSettingController::class, 'store'])->name('site-setting.store');
        Route::get('site-setting/{site_setting}', [SiteSettingController::class, 'show'])->name('site-setting.show');
        Route::get('site-setting/{site_setting}/edit', [SiteSettingController::class, 'edit'])->name('site-setting.edit');
        Route::post('site-setting/{site_setting}', [SiteSettingController::class, 'update'])->name('site-setting.update');
        Route::delete('site-setting/{site_setting}', [SiteSettingController::class, 'destroy'])->name('site-setting.destroy');

        Route::get('site-seo', [SiteSeoController::class, 'index'])->name('site-seo.index');
        Route::get('site-seo/create', [SiteSeoController::class, 'create'])->name('site-seo.create');
        Route::post('site-seo', [SiteSeoController::class, 'store'])->name('site-seo.store');
        Route::get('site-seo/{site_seo}', [SiteSeoController::class, 'show'])->name('site-seo.show');
        Route::get('site-seo/{site_seo}/edit', [SiteSeoController::class, 'edit'])->name('site-seo.edit');
        Route::put('site-seo/{site_seo}', [SiteSeoController::class, 'update'])->name('site-seo.update');
        Route::patch('site-seo/{site_seo}', [SiteSeoController::class, 'update']);
        Route::delete('site-seo/{site_seo}', [SiteSeoController::class, 'destroy'])->name('site-seo.destroy');

        Route::get('theme', [ThemeController::class, 'index'])->name('theme.index');
        Route::get('theme/create', [ThemeController::class, 'create'])->name('theme.create');
        Route::post('theme', [ThemeController::class, 'store'])->name('theme.store');
        Route::get('theme/{theme}', [ThemeController::class, 'show'])->name('theme.show');
        Route::get('theme/{theme}/edit', [ThemeController::class, 'edit'])->name('theme.edit');
        Route::post('theme/{theme}', [ThemeController::class, 'update'])->name('theme.update');
        Route::delete('theme/{theme}', [ThemeController::class, 'destroy'])->name('theme.destroy');

        // ========================================
        // USER MANAGEMENT ROUTES
        // ========================================

        Route::get('user-address', [UserAddressController::class, 'index'])->name('user-address.index');
        Route::get('user-address/create', [UserAddressController::class, 'create'])->name('user-address.create');
        Route::post('user-address', [UserAddressController::class, 'store'])->name('user-address.store');
        Route::get('user-address/{user_address}', [UserAddressController::class, 'show'])->name('user-address.show');
        Route::get('user-address/{user_address}/edit', [UserAddressController::class, 'edit'])->name('user-address.edit');
        Route::post('user-address/{user_address}', [UserAddressController::class, 'update'])->name('user-address.update');
        Route::delete('user-address/{user_address}', [UserAddressController::class, 'destroy'])->name('user-address.destroy');

        // ========================================
        // BUSINESS MANAGEMENT ROUTES
        // ========================================

        Route::get('business-info', [BusinessInfoController::class, 'index'])->name('business-info.index');
        Route::get('business-info/create', [BusinessInfoController::class, 'create'])->name('business-info.create');
        Route::post('business-info', [BusinessInfoController::class, 'store'])->name('business-info.store');
        Route::get('business-info/{business_info}', [BusinessInfoController::class, 'show'])->name('business-info.show');
        Route::get('business-info/{business_info}/edit', [BusinessInfoController::class, 'edit'])->name('business-info.edit');
        Route::post('business-info/{business_info}', [BusinessInfoController::class, 'update'])->name('business-info.update');
        Route::delete('business-info/{business_info}', [BusinessInfoController::class, 'destroy'])->name('business-info.destroy');

        Route::get('static-page', [StaticPageController::class, 'index'])->name('static-page.index');
        Route::get('static-page/create', [StaticPageController::class, 'create'])->name('static-page.create');
        Route::post('static-page', [StaticPageController::class, 'store'])->name('static-page.store');
        Route::get('static-page/{static_page}/edit', [StaticPageController::class, 'edit'])->name('static-page.edit');
        Route::post('static-page/{static_page}', [StaticPageController::class, 'update'])->name('static-page.update');
        Route::delete('static-page/{static_page}', [StaticPageController::class, 'destroy'])->name('static-page.destroy');

        Route::get('marketing-service', [MarketingServiceController::class, 'index'])->name('marketing-service.index');
        Route::get('marketing-service/create', [MarketingServiceController::class, 'create'])->name('marketing-service.create');
        Route::post('marketing-service', [MarketingServiceController::class, 'store'])->name('marketing-service.store');
        Route::get('marketing-service/{marketing_service}', [MarketingServiceController::class, 'show'])->name('marketing-service.show');
        Route::get('marketing-service/{slug}/edit', [MarketingServiceController::class, 'edit'])->name('marketing-service.edit');
        Route::post('marketing-service/{slug}/update-credentials', [MarketingServiceController::class, 'updateCredentials'])->name('admin.marketing.update-credentials');
        Route::post('marketing-service/{slug}/toggle-status', [MarketingServiceController::class, 'toggleStatus'])->name('admin.marketing.toggle-status');
        Route::post('marketing-service/{marketing_service}', [MarketingServiceController::class, 'update'])->name('marketing-service.update');
        Route::delete('marketing-service/{marketing_service}', [MarketingServiceController::class, 'destroy'])->name('marketing-service.destroy');

        // ========================================
        // SUPPORT & FAQ ROUTES
        // ========================================

        Route::get('faq-question', [FaqQuestionController::class, 'index'])->name('faq-question.index');
        Route::get('faq-question/create', [FaqQuestionController::class, 'create'])->name('faq-question.create');
        Route::post('faq-question', [FaqQuestionController::class, 'store'])->name('faq-question.store');
        Route::get('faq-question/{faq_question}', [FaqQuestionController::class, 'show'])->name('faq-question.show');
        Route::get('faq-question/{faq_question}/edit', [FaqQuestionController::class, 'edit'])->name('faq-question.edit');
        Route::post('faq-question/{faq_question}', [FaqQuestionController::class, 'update'])->name('faq-question.update');
        Route::delete('faq-question/{faq_question}', [FaqQuestionController::class, 'destroy'])->name('faq-question.destroy');

        Route::get('announcement', [AnnouncementController::class, 'index'])->name('announcement.index');
        Route::get('announcement/create', [AnnouncementController::class, 'create'])->name('announcement.create');
        Route::post('announcement', [AnnouncementController::class, 'store'])->name('announcement.store');
        Route::get('announcement/{announcement}', [AnnouncementController::class, 'show'])->name('announcement.show');
        Route::get('announcement/{announcement}/edit', [AnnouncementController::class, 'edit'])->name('announcement.edit');
        Route::post('announcement/{announcement}', [AnnouncementController::class, 'update'])->name('announcement.update');
        Route::delete('announcement/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcement.destroy');

        // ========================================
        // AJAX ROUTES
        // ========================================

        Route::get('flashdeals/{id}/products', [FlashDealController::class, 'getProductsForFlashDeal'])
            ->name('flashdeals.getProductsForFlashDeal');
        Route::post('flashdeals/{id}/products', [FlashDealController::class, 'addProductToFlashDeal'])
            ->name('flashdeals.addProductToFlashDeal');

        Route::get('/subcategory/ajax/{categoryId}', [ProductController::class, 'getSubCategories'])
            ->name('subcategory.ajax');
        Route::get('/child-category/ajax/{subCategoryId}', [ProductController::class, 'getChildCategories'])
            ->name('child-category.ajax');

        // Category hierarchy routes
        Route::get('/category/ajax/subcategories/{parent_id}', [CategoryController::class, 'getSubCategories'])
            ->name('category.subcategories');
        Route::get('/category/ajax/child-categories/{parent_id}', [CategoryController::class, 'getChildCategories'])
            ->name('category.child-categories');
        Route::get('/category/ajax/hierarchy', [CategoryController::class, 'getHierarchy'])
            ->name('category.hierarchy');
    });
});
