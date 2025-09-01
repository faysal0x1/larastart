<?php

namespace App\Services;

use Illuminate\Support\Facades\Session;

class ToastService
{
    /**
     * Add a success toast message
     */
    public static function success(string $message, string $title = 'Success')
    {
        Session::flash('flash', [
            'success' => true,
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Add an error toast message
     */
    public static function error(string $message, string $title = 'Error')
    {
        Session::flash('flash', [
            'success' => false,
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Add an info toast message
     */
    public static function info(string $message, string $title = 'Info')
    {
        Session::flash('flash', [
            'success' => null,
            'type' => 'info',
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Add a warning toast message
     */
    public static function warning(string $message, string $title = 'Warning')
    {
        Session::flash('flash', [
            'success' => null,
            'type' => 'warning',
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Add a custom toast message
     */
    public static function custom(string $message, string $type = 'default', string $title = '')
    {
        Session::flash('flash', [
            'success' => null,
            'type' => $type,
            'message' => $message,
            'title' => $title,
        ]);
    }
}
