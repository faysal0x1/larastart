import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import Can from '@/components/permissions/Can';
import Swal from 'sweetalert2';

const ActionsDropdown = ({ item, routes, permissions = {} }) => {
    const ProtectedItem = ({ permission, children }) => {
        if (permission) {
            return <Can permission={permission}>{children}</Can>;
        }
        return children;
    };

    const confirmDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#000000',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = routes.delete(item.id);
                // Use router from @inertiajs/react
                router.delete(url);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your item has been deleted.',
                    icon: 'success',
                    background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#000000',
                });
            }
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:border-slate-700" />

                {routes.view && (
                    <ProtectedItem permission={permissions.view}>
                        <DropdownMenuItem asChild>
                            <Link href={routes.view(item.id)} className="w-full cursor-pointer">
                                View
                            </Link>
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}

                {routes.edit && (
                    <ProtectedItem permission={permissions.edit}>
                        <DropdownMenuItem asChild>
                            <Link href={routes.edit(item.id)} className="w-full cursor-pointer">
                                Edit
                            </Link>
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}

                {routes.delete && (
                    <ProtectedItem permission={permissions.delete}>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400" onClick={confirmDelete}>
                            Delete
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsDropdown;