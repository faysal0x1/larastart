import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function ToastManager() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            if (flash.success === true) {
                toast.success('Success', {
                    description: flash.message,
                });
            } else if (flash.success === false) {
                toast.error('Error', {
                    description: flash.message,
                });
            }
        }
    }, [flash]);

    return <Toaster position="top-right" />;
}
