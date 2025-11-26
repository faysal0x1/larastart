<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\DailySummary;
use App\Models\Editor;
use App\Models\Language;
use App\Models\OperatingSystem;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class StatsController extends Controller
{
    public function getLanguageStats(Request $request)
    {
        $user = $request->user();
        $days = $request->get('days', 30);
        $startDate = Carbon::today()->subDays($days);

        $languageStats = Language::where('user_id', $user->id)
            ->where('date', '>=', $startDate)
            ->selectRaw('name, SUM(total_seconds) as total_seconds, AVG(percent) as avg_percent')
            ->groupBy('name')
            ->orderByDesc('total_seconds')
            ->get();

        return response()->json($languageStats);
    }

    public function getProjectStats(Request $request)
    {
        $user = $request->user();
        $days = $request->get('days', 30);
        $startDate = Carbon::today()->subDays($days);

        $projectStats = Project::where('user_id', $user->id)
            ->where('date', '>=', $startDate)
            ->selectRaw('name, SUM(total_seconds) as total_seconds, COUNT(*) as active_days')
            ->groupBy('name')
            ->orderByDesc('total_seconds')
            ->get();

        return response()->json($projectStats);
    }

    public function getDailyActivity(Request $request)
    {
        $user = $request->user();
        $days = $request->get('days', 7);
        $startDate = Carbon::today()->subDays($days);

        $dailyActivity = DailySummary::where('user_id', $user->id)
            ->where('date', '>=', $startDate)
            ->orderBy('date')
            ->get();

        return response()->json($dailyActivity);
    }

    public function editors(Request $request)
    {
        $user = Auth::user();
        $days = $request->input('days', 30);
        $startDate = Carbon::now()->subDays($days - 1);

        return Editor::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, Carbon::now()])
            ->selectRaw('name, SUM(total_seconds) as total_seconds, AVG(percent) as avg_percent')
            ->groupBy('name')
            ->orderByDesc('total_seconds')
            ->get()
            ->map(function ($editor) {
                return [
                    'name' => $editor->name,
                    'total_seconds' => $editor->total_seconds,
                    'total_hours' => round($editor->total_seconds / 3600, 2),
                    'avg_percent' => round($editor->avg_percent, 2),
                ];
            });
    }

    public function operatingSystems(Request $request)
    {
        $user = Auth::user();
        $days = $request->input('days', 30);
        $startDate = Carbon::now()->subDays($days - 1);

        return OperatingSystem::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, Carbon::now()])
            ->selectRaw('name, SUM(total_seconds) as total_seconds, AVG(percent) as avg_percent')
            ->groupBy('name')
            ->orderByDesc('total_seconds')
            ->get()
            ->map(function ($os) {
                return [
                    'name' => $os->name,
                    'total_seconds' => $os->total_seconds,
                    'total_hours' => round($os->total_seconds / 3600, 2),
                    'avg_percent' => round($os->avg_percent, 2),
                ];
            });
    }

    public function categories(Request $request)
    {
        $user = Auth::user();
        $days = $request->input('days', 30);
        $startDate = Carbon::now()->subDays($days - 1);

        return Category::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, Carbon::now()])
            ->selectRaw('name, SUM(total_seconds) as total_seconds, AVG(percent) as avg_percent')
            ->groupBy('name')
            ->orderByDesc('total_seconds')
            ->get()
            ->map(function ($category) {
                return [
                    'name' => $category->name,
                    'total_seconds' => $category->total_seconds,
                    'total_hours' => round($category->total_seconds / 3600, 2),
                    'avg_percent' => round($category->avg_percent, 2),
                ];
            });
    }

    public function summary(Request $request)
    {
        $user = Auth::user();
        $days = $request->input('days', 30);
        $startDate = Carbon::now()->subDays($days - 1);

        $cacheKey = "user_{$user->id}_summary_{$days}";

        return Cache::remember($cacheKey, 600, function () use ($user, $startDate, $days) {
            $totalSeconds = DailySummary::where('user_id', $user->id)
                ->whereBetween('date', [$startDate, Carbon::now()])
                ->sum('total_seconds');

            $activeDays = DailySummary::where('user_id', $user->id)
                ->whereBetween('date', [$startDate, Carbon::now()])
                ->where('total_seconds', '>', 0)
                ->count();

            $averagePerDay = $activeDays > 0 ? $totalSeconds / $activeDays : 0;

            return [
                'total_seconds' => $totalSeconds,
                'total_hours' => round($totalSeconds / 3600, 2),
                'active_days' => $activeDays,
                'total_days' => $days,
                'average_seconds_per_day' => round($averagePerDay),
                'average_hours_per_day' => round($averagePerDay / 3600, 2),
                'period' => $days,
                'start_date' => $startDate->format('Y-m-d'),
                'end_date' => Carbon::now()->format('Y-m-d'),
            ];
        });
    }
}
