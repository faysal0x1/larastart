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


    // client Dashboard

    public function clientDashboard()
    {
        return Inertia::render('frontend/custom/clientDashboard/clientDashboard');
    }
}
