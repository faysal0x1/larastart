<?php

// Add this to your helpers.php file or create a new helpers file

if (!function_exists('toast')) {
    /**
     * Create a toast notification
     */
    function toast(string $message, string $type = 'success', string $title = '')
    {
        $data = [
            'message' => $message,
            'title' => $title,
        ];

        switch ($type) {
            case 'success':
                $data['success'] = true;
                break;
            case 'error':
                $data['success'] = false;
                break;
            default:
                $data['success'] = null;
                $data['type'] = $type;
                break;
        }

        session()->flash('flash', $data);
    }
}

if (!function_exists('toastSuccess')) {
    /**
     * Create a success toast notification
     */
    function toastSuccess(string $message, string $title = 'Success')
    {
        toast($message, 'success', $title);
    }
}

if (!function_exists('toastError')) {
    /**
     * Create an error toast notification
     */
    function toastError(string $message, string $title = 'Error')
    {
        toast($message, 'error', $title);
    }
}

if (!function_exists('toastInfo')) {
    /**
     * Create an info toast notification
     */
    function toastInfo(string $message, string $title = 'Info')
    {
        toast($message, 'info', $title);
    }
}

if (!function_exists('toastWarning')) {
    /**
     * Create a warning toast notification
     */
    function toastWarning(string $message, string $title = 'Warning')
    {
        toast($message, 'warning', $title);
    }
}
