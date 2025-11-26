<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\SSLCommerzService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    protected $sslCommerzService;

    public function __construct(SSLCommerzService $sslCommerzService)
    {
        $this->sslCommerzService = $sslCommerzService;
    }

    /**
     * Handle payment success callback
     */
    public function success(Request $request): JsonResponse
    {
        Log::info('Payment success callback received', $request->all());

        $result = $this->sslCommerzService->processPaymentSuccess($request);

        if ($result['success']) {
            return response()->json([
                'success'           => true,
                'message'           => 'Payment completed successfully',
                'order_id'          => $result['order_id'],
                'order_number'      => $result['order_number'],
                'payment_reference' => $result['payment_reference'],
                'amount'            => $result['amount'],
                'currency'          => $result['currency'],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);
        }
    }

    /**
     * Handle payment failure callback
     */
    public function failed(Request $request): JsonResponse
    {
        Log::info('Payment failure callback received', $request->all());

        $result = $this->sslCommerzService->processPaymentFailure($request);

        if ($result['success']) {
            return response()->json([
                'success'       => true,
                'message'       => 'Payment failure processed',
                'order_id'      => $result['order_id'],
                'error_message' => $result['error_message'],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);
        }
    }

    /**
     * Handle payment cancellation callback
     */
    public function cancelled(Request $request): JsonResponse
    {
        Log::info('Payment cancellation callback received', $request->all());

        $result = $this->sslCommerzService->processPaymentCancellation($request);

        if ($result['success']) {
            return response()->json([
                'success'  => true,
                'message'  => 'Payment cancellation processed',
                'order_id' => $result['order_id'],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);
        }
    }

    /**
     * Handle IPN (Instant Payment Notification)
     */
    public function ipn(Request $request): JsonResponse
    {
        Log::info('IPN callback received', $request->all());

        $result = $this->sslCommerzService->processIPN($request);

        if ($result['success']) {
            return response()->json([
                'success' => true,
                'message' => 'IPN processed successfully',
                'data'    => $result,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);
        }
    }
}