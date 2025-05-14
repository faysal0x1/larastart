<?php
namespace App\Http\Controllers;

use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use Inertia\Inertia;

class FrontendController extends Controller
{
	public function index() {
		$categories = MicroTaskCategory::whereStatus(1)->get();
		$microTasks = MicroTask::whereStatus('pending')->
			with(['employer'])->get();


		return Inertia::render('frontend/home',
			[
				'categories' => $categories,
				'microTasks' => $microTasks
			]);
	}

    public function employeeDashboard() {
        return Inertia::render('frontend/employeeDashboard/employeeDashboardIndex');
    }

    // Employee Job List From Employee Dashboard
    public function EmployeeJobsList() {
        return Inertia::render('frontend/employeeDashboard/JobList/EmployeeJobsList');
    }

    // Employee Job Details From Employee Dashboard
    public function employeeJobDetails() {
        return Inertia::render('frontend/employeeDashboard/jobDetails/JobDetailsPage');
    }

    // Employee Login
    public function FreelancerLogin() {
        return Inertia::render('frontend/custom/FreelancerLogin');
    }
    // Employee sing Up
    public function SignupPage() {
        return Inertia::render('frontend/custom/SignupPage');
    }

    //  Forget pass
    public function ForgotPasswordPage() {
        return Inertia::render('frontend/custom/ForgotPasswordPage');
    }
    //  Forget pass
    public function OTPVerificationPage() {
        return Inertia::render('frontend/custom/OTPVerificationPage');
    }

    //  Forget pass
    public function JobPostingForm() {
        return Inertia::render('frontend/custom/JobPostingForm');
    }
    //  Forget pass
    public function upload() {
        return Inertia::render('frontend/custom/upload');
    }
    //  SearchPage
    public function SearchPage() {
        return Inertia::render('frontend/custom/MicroJobSearchPage');
    }

    //  categorySearch Page
    public function categorySearch() {
        $category = MicroTaskCategory::whereStatus(1)->
		whereId(1)->first();


		$microTask=MicroTask::with('category')->whereCategoryId($category->id)->get();

        return Inertia::render('frontend/custom/categorySearch',
            [
                'category' => $category,
				'microTask'=>$microTask,
				'count'=>$microTask->count()
            ]);
    }

    //  Dashboard Profile page
    public function ProfileIndex() {
        return Inertia::render('frontend/custom/ProfileIndex');
    }
    //  submit task page
    public function SubmitTask() {
        return Inertia::render('frontend/custom/SubmitTask');
    }
    //  setting page
    public function AccountSettings() {
        return Inertia::render('frontend/custom/setting');
    }
    //  Blog Page page
    public function Blog() {
        return Inertia::render('frontend/custom/blog/BlogIndex');
    }
    //  Blog Page page
    public function BlogDetail() {
        return Inertia::render('frontend/custom/blog/BlogDetailsIndex');
    }
    //  FAQ Page page
    public function FAQ() {
        return Inertia::render('frontend/custom/FAQ/FAQPage');
    }

    // client Dashboard

    public function clientDashboard() {
        return Inertia::render('frontend/custom/clientDashboard/clientDashboard');
    }
}