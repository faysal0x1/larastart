<?php

namespace App\Traits;

trait HasToast
{
    /**
     * Flash a success toast message
     */
    protected function toastSuccess(string $message, string $title = 'Success')
    {
        session()->flash('flash', [
            'success' => true,
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Flash an error toast message
     */
    protected function toastError(string $message, string $title = 'Error')
    {
        session()->flash('flash', [
            'success' => false,
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Flash an info toast message
     */
    protected function toastInfo(string $message, string $title = 'Info')
    {
        session()->flash('flash', [
            'success' => null,
            'type' => 'info',
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Flash a warning toast message
     */
    protected function toastWarning(string $message, string $title = 'Warning')
    {
        session()->flash('flash', [
            'success' => null,
            'type' => 'warning',
            'message' => $message,
            'title' => $title,
        ]);
    }

    /**
     * Flash a custom toast message
     */
    protected function toast(string $message, string $type = 'default', string $title = '')
    {
        session()->flash('flash', [
            'success' => null,
            'type' => $type,
            'message' => $message,
            'title' => $title,
        ]);
    }
}
