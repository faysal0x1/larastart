import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Link } from '@inertiajs/react';

const ActionsDropdown = ({ item, routes }) => {
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
                    <DropdownMenuItem asChild>
                        <Link href={routes.view(item.id)} className="w-full cursor-pointer">
                            View
                        </Link>
                    </DropdownMenuItem>
                )}

                {routes.edit && (
                    <DropdownMenuItem asChild>
                        <Link href={routes.edit(item.id)} className="w-full cursor-pointer">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                )}

                {routes.delete && (
                    <DropdownMenuItem className="text-red-600 focus:text-red-600 dark:text-red-400" asChild>
                        <Link
                            href={routes.delete(item.id)}
                            method="delete"
                            as="button"
                            className="w-full cursor-pointer text-left"
                            data={{ _method: 'delete' }}
                        >
                            Delete
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsDropdown;
