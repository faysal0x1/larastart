<?php

use App\Http\Controllers\EmonController;
use Illuminate\Support\Facades\Route;

Route::controller(EmonController::class)->group(function () {

    Route::get('/address', 'AddressBook')->name('address.book');
    Route::get('/best-sellers', 'bestSellers')->name('best.sellers');
    //Account Settings page
    Route::get('/accountSettings', 'accountSettings')->name('user.account.settings');
    //Payment Options page
    Route::get('/paymentOptions', 'paymentOptions')->name('user.payment.options');
    Route::get('/loginPage', 'loginPage')->name('login.page');
    Route::get('/registers', 'register')->name('register.page');
    Route::get('/forgotPassword', 'forgotPassword')->name('forgot.password');
    //Term & Conditions page
    Route::get('/termsConditions', 'termsConditions')->name('terms.conditions');
    //Privacy Policy page
    Route::get('/privacyPolicy', 'privacyPolicy')->name('privacy.policy');
    // Return Policy page
    Route::get('/return-policy', 'returnPolicy')->name('return.policy');
    //Brand page

    Route::get('/brandStore', 'brandStore')->name('brand.store');

    //Trending Deals page
    Route::get('/trendingDeals', 'trendingDeals')->name('emon.trending.deals');

    // CPU & Processor page
    Route::get('/cpuProcessor', 'cpuProcessor')->name('cpu.processor');

});

// Language switching routes
// Route::get('/language/switch/{locale}', [LanguageController::class, 'switchLanguage'])->name('language.switch');
// Route::get('/language', [LanguageController::class, 'getLanguages'])->name('language.list');
// Route::get('/language-test', [LanguageController::class, 'test'])->name('language.test');
