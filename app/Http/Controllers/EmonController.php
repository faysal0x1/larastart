<?php

namespace App\Http\Controllers;

use App\Enums\StaticPageTypeEnum;
use App\Services\RouteResolver;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmonController extends Controller
{
    public function __construct(
        private readonly RouteResolver $routeResolver
    ) {
    }

    //Cart page
    public function shopcart()
    {
        return Inertia::render('cart/ShopCart',);
    }
    public function checkout()
    {
        return Inertia::render('cart/Checkout',);
    }
    //Login & Register
    public function loginPage()
    {
        return Inertia::render('frontend/auth/LoginPage',);
    }
    public function register()
    {
        return Inertia::render('frontend/auth/RegisterPage',);
    }
    public function forgotPassword()
    {
        return Inertia::render('frontend/auth/ForgotPasswordPage',);
    }
    //User Sidebar page
    public function addressBook()
    {
        return Inertia::render('frontend/user/AddressBook',);
    }
    //Account page
    public function accountSettings()
    {
        return Inertia::render('frontend/user/AccountSettings',);
    }
    //Payment page
    public function paymentOptions()
    {
        return Inertia::render('frontend/user/PaymentOptions',);
    }
    // Best Sellers page
        public function bestSellers()
    {
        return Inertia::render('bestSeller/BestSellers');
    }

    //Terms & Conditions page
    public function termsConditions(): Response
    {
        return $this->renderStaticPage(
            StaticPageTypeEnum::TERMS_AND_CONDITIONS->value,
            'frontend/Footer/Term&Condition'
        );
    }
    //Privacy Policy page
    public function privacyPolicy(): Response
    {
        return $this->renderStaticPage(
            StaticPageTypeEnum::PRIVACY_POLICY->value,
            'frontend/Footer/PrivacyPolicy'
        );
    }

    public function returnPolicy(): Response
    {
        return $this->renderStaticPage(
            StaticPageTypeEnum::RETURN_POLICY->value,
            'frontend/static/Page',
            [
                'page' => [
                    'title' => 'Return Policy',
                    'summary' => null,
                    'content' => '<p>Return policy content coming soon.</p>',
                ],
            ]
        );
    }
    //Brand page
    public function brandStore()
    {
        return Inertia::render('frontend/brand/Brand');
    }
    //Trending Deals page
    public function trendingDeals()
    {
        return Inertia::render('frontend/trendinDeal/TrendinDeal');
    }
    // CPU & Processor page
    public function cpuProcessor()
    {
        return Inertia::render('frontend/cpu-processor/CPU-Processor');
    }
    // User Dashboard page
    public function userDashboard()
    {
        return Inertia::render('frontend/userDashboard/app/profile/page');
    }

    protected function renderStaticPage(string $slug, string $fallbackComponent, array $fallbackProps = []): Response
    {
        return $this->routeResolver->renderStaticPage($slug, $fallbackComponent, $fallbackProps);
    }
}
