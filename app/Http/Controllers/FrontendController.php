<?php

namespace App\Http\Controllers;

use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {


        return Inertia::render('frontend/home',);
    }

    public function employeeDashboard()
    {
        return Inertia::render('frontend/employeeDashboard/employeeDashboardIndex');
    }


    //  setting page
    public function AccountSettings()
    {
        return Inertia::render('frontend/custom/setting');
    }
    //  Blog Page page
    public function Blog()
    {
        return Inertia::render('frontend/custom/blog/BlogIndex');
    }
    //  Blog Page page
    public function BlogDetail()
    {
        return Inertia::render('frontend/custom/blog/BlogDetailsIndex');
    }


    // client Dashboard

    public function clientDashboard()
    {
        return Inertia::render('frontend/custom/clientDashboard/clientDashboard');
    }
}
