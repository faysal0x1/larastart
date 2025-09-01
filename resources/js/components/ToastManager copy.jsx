import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function ToastManager() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            const { success, type, message, title } = flash;

            // Handle success/error based on success boolean
            if (success === true) {
                toast.success(title || 'Success', {
                    description: message,
                });
            } else if (success === false) {
                toast.error(title || 'Error', {
                    description: message,
                });
            }
            // Handle other types when success is null
            else if (type) {
                switch (type) {
                    case 'info':
                        toast.info(title || 'Info', {
                            description: message,
                        });
                        break;
                    case 'warning':
                        toast.warning(title || 'Warning', {
                            description: message,
                        });
                        break;
                    case 'loading':
                        toast.loading(title || 'Loading', {
                            description: message,
                        });
                        break;
                    case 'promise':
                        // For promise-based toasts
                        toast.promise(
                            Promise.resolve(),
                            {
                                loading: 'Loading...',
                                success: (data) => message,
                                error: 'Error occurred',
                            }
                        );
                        break;
                    default:
                        toast(title || 'Notification', {
                            description: message,
                        });
                }
            }
        }
    }, [flash]);

    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
                style: {
                    background: 'white',
                    color: 'black',
                },
                className: 'class',
            }}
        />
    );
}
