// resources/js/Pages/posts/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import * as LucideIcons from 'lucide-react';

export default function MicroTaskCategory() {
    const { data, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Micro Task Category',
            href: '/micro-task-categories'
        }
    ];

    function toPascalCase(str) {
        if (!str || typeof str !== 'string') return '';
        return str
            .split(/[-_ ]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }


    // Define custom actions renderer
    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => (
            <div className="font-medium">
                <Link href={route('posts.show', item.id)} className="hover:underline">
                    {item.name}
                </Link>
            </div>
        )),

        column('description', 'Description'),
        // column('icon', 'icon'),
        column('icon', 'Icon', (item) => {
            const iconName = toPascalCase(item.icon);
            const Icon = LucideIcons[iconName];

            return (
                <div className="font-medium flex items-center gap-2">
                    {Icon && <Icon className="w-10 h-10 text-gray-600" />}
                </div>
            );
        }),

        column('created_at', 'Created', (item) => <span>{new Date(item.created_at).toLocaleDateString()}</span>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('users.show', id),
                    edit: (id) => route('users.edit', id),
                    delete: (id) => route('users.destroy', id)
                }}
            />
        ))
    ];
    const { flash } = usePage().props;

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success.title || 'Success!', {
                description: flash.success.message
            });
        }

        if (flash?.error) {
            toast.error(flash.error.title || 'Error!', {
                description: flash.error.message
            });
        }
    }, [flash]);
    return (
        <>
            <ListingPage
                title="Users"
                data={data}
                filters={filters}
                currentUser={auth.user}
                resourceName="micro-task-categories"
                breadcrumbs={breadcrumbs}
                columns={columns}
                createButtonText="New Micro Job Category"
            />
            <Toaster
                position="top-right"
                richColors
                closeButton
                expand={false}
                visibleToasts={3}
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))'
                    }
                }}
            />
        </>
    );
}
