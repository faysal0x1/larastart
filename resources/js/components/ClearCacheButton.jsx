import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ClearCacheButton({
    variant = 'ghost',
    size = 'sm',
    className = '',
    showLabel = true
}) {
    const handleClearCache = () => {
        const isDark = document.documentElement.classList.contains('dark');

        Swal.fire({
            title: 'Clear All Cache?',
            text: 'This will clear all application caches including SmartCache, Laravel cache, config, routes, and views. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, clear all caches!',
            cancelButtonText: 'Cancel',
            background: isDark ? '#0f172a' : '#ffffff',
            color: isDark ? '#f1f5f9' : '#1f2937',
            customClass: {
                popup: 'rounded-xl shadow-2xl border-0',
                title: 'text-lg font-semibold',
                content: 'text-sm',
                confirmButton: 'rounded-lg font-medium px-4 py-2 shadow-sm hover:shadow-md transition-all',
                cancelButton: 'rounded-lg font-medium px-4 py-2 shadow-sm hover:shadow-md transition-all',
            },
            buttonsStyling: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('cache.clear'), {}, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'All caches have been cleared successfully.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            background: isDark ? '#0f172a' : '#ffffff',
                            color: isDark ? '#f1f5f9' : '#1f2937',
                            customClass: {
                                popup: 'rounded-xl shadow-2xl border-0',
                                title: 'text-lg font-semibold text-green-600',
                            },
                        });
                    },
                    onError: (errors) => {
                        Swal.fire({
                            title: 'Error!',
                            text: errors?.message || 'Failed to clear caches. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            background: isDark ? '#0f172a' : '#ffffff',
                            color: isDark ? '#f1f5f9' : '#1f2937',
                            customClass: {
                                popup: 'rounded-xl shadow-2xl border-0',
                                title: 'text-lg font-semibold text-red-600',
                            },
                        });
                    },
                });
            }
        });
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleClearCache}
            className={className}
            title="Clear all caches"
        >
            <RefreshCw className="h-4 w-4" />
            {showLabel && <span className="ml-1">Clear Cache</span>}
        </Button>
    );
}

