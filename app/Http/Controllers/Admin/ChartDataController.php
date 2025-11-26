<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DailySummary;
use App\Models\LanguageDailyTime;
use App\Models\ProjectDailyTime;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartDataController extends Controller
{
    public function userDailyTime(Request $request, $userId)
    {
        $days = $request->get('days', 30);

        $data = DailySummary::where('user_id', $userId)
            ->where('date', '>=', Carbon::now()->subDays($days))
            ->orderBy('date')
            ->get(['date', 'total_seconds']);

        return response()->json($data);
    }

    public function languageDistribution($userId)
    {
        $data = LanguageDailyTime::where('user_id', $userId)
            ->where('date', '>=', Carbon::now()->subDays(30))
            ->selectRaw('language_id, SUM(total_seconds) as total_seconds')
            ->groupBy('language_id')
            ->with('language')
            ->get();

        return response()->json($data);
    }

    public function projectTrends($userId, $projectId)
    {
        $data = ProjectDailyTime::where('user_id', $userId)
            ->where('project_id', $projectId)
            ->where('date', '>=', Carbon::now()->subDays(90))
            ->orderBy('date')
            ->get(['date', 'total_seconds']);

        return response()->json($data);
    }
}
