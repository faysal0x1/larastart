import Can from '@/components/permissions/Can.jsx';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ActionsDropdown = ({
                             item,
                             actions = [],
                             size = 'default',
                             variant = 'ghost',
                             align = 'end',
                             showLabel = true,
                             // New trigger customization props
                             triggerIcon: TriggerIcon,
                             triggerText,
                             triggerClassName = '',
                         }) => {
    const ProtectedItem = ({ permission, children }) => {
        if (permission) {
            return <Can permission={permission}>{children}</Can>;
        }
        return children;
    };

    const confirmDelete = (action) => {
        const isDark = document.documentElement.classList.contains('dark');

        Swal.fire({
            title: action.confirmTitle || 'Are you sure?',
            text: action.confirmText || "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: action.confirmButton || 'Yes, delete it!',
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
                handleAction(action);

                Swal.fire({
                    title: 'Deleted!',
                    text: action.successMessage || 'Item has been deleted successfully.',
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
            }
        });
    };

    const handleAction = (action) => {
        if (action.onClick) {
            action.onClick(item);
        } else if (action.route) {
            const url = action.route(item.id);
            const options = action.options || {};

            if (action.method === 'post') {
                router.post(url, options.data || {}, options);
            } else if (action.method === 'put') {
                router.put(url, options.data || {}, options);
            } else if (action.method === 'patch') {
                router.patch(url, options.data || {}, options);
            } else if (action.method === 'delete') {
                router.delete(url, options);
            } else {
                // Default to GET (navigation)
                router.get(url, {}, options);
            }
        }
    };

    const handleClick = (action) => {
        if (action.disabled) return;

        if (action.type === 'delete') {
            confirmDelete(action);
        } else {
            handleAction(action);
        }
    };

    // Enhanced icon mapping with more types
    const getDefaultIcon = (type) => {
        const iconMap = {
            view: Eye,
            show: Eye,
            edit: Edit,
            update: Edit,
            delete: Trash2,
            remove: Trash2,
            copy: Copy,
            duplicate: Copy,
        };
        return iconMap[type];
    };

    const getActionVariant = (action) => {
        if (action.disabled) return 'muted';

        const variantMap = {
            delete: 'destructive',
            remove: 'destructive',
            primary: 'default',
            secondary: 'secondary',
        };

        return action.variant || variantMap[action.type] || 'default';
    };

    const renderAction = (action, index) => {
        const IconComponent = action.icon || getDefaultIcon(action.type);
        const isLink = action.route && !action.method && action.type !== 'delete' && !action.disabled;
        const variant = getActionVariant(action);

        const baseClasses = `
            cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
            hover:bg-slate-50 dark:hover:bg-slate-800/50
            focus:bg-slate-50 dark:focus:bg-slate-800/50
            ${action.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        `;

        const variantClasses = {
            destructive: 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20',
            default: 'text-slate-700 dark:text-slate-200',
            secondary: 'text-slate-600 dark:text-slate-300',
            muted: 'text-slate-400 dark:text-slate-500',
        };

        const finalClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${action.className || ''}`.trim();

        return (
            <ProtectedItem key={index} permission={action.permission}>
                {isLink ? (
                    <DropdownMenuItem asChild className="p-0">
                        <Link href={action.route(item.id)} className={finalClasses}>
                            <div className="flex w-full items-center gap-3">
                                {IconComponent && <IconComponent className="h-4 w-4 shrink-0" />}
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium">{action.label}</span>
                                    {action.description && (
                                        <span className="truncate text-xs text-slate-500 dark:text-slate-400">{action.description}</span>
                                    )}
                                </div>
                            </div>
                            {action.shortcut && <kbd className="ml-auto font-mono text-xs text-slate-400 dark:text-slate-500">{action.shortcut}</kbd>}
                        </Link>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className={`p-0 ${action.disabled ? 'pointer-events-none' : ''}`} onClick={() => handleClick(action)}>
                        <div className={finalClasses}>
                            <div className="flex w-full items-center gap-3">
                                {IconComponent && <IconComponent className="h-4 w-4 shrink-0" />}
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium">{action.label}</span>
                                    {action.description && (
                                        <span className="truncate text-xs text-slate-500 dark:text-slate-400">{action.description}</span>
                                    )}
                                </div>
                            </div>
                            {action.shortcut && <kbd className="ml-auto font-mono text-xs text-slate-400 dark:text-slate-500">{action.shortcut}</kbd>}
                        </div>
                    </DropdownMenuItem>
                )}
            </ProtectedItem>
        );
    };

    // Group actions by priority and type
    const primaryActions = actions.filter((action) => action.priority === 'primary' && action.type !== 'delete');
    const secondaryActions = actions.filter((action) => !action.priority && action.type !== 'delete');
    const deleteActions = actions.filter((action) => action.type === 'delete');

    const hasActions = actions.length > 0;

    if (!hasActions) {
        return null;
    }
    // Button size variants - now handles both icon-only and text buttons
    const getButtonClasses = () => {
        const hasText = !!triggerText;
        const hasIcon = !!TriggerIcon || (!TriggerIcon && !triggerText);

        if (hasText && hasIcon) {
            // Icon + Text button
            const textSizes = {
                sm: 'h-7 px-2 text-xs gap-1.5',
                default: 'h-8 px-3 text-sm gap-2',
                lg: 'h-9 px-4 text-sm gap-2.5',
            };
            return textSizes[size];
        } else if (hasText) {
            // Text only button
            const textOnlySizes = {
                sm: 'h-7 px-2 text-xs',
                default: 'h-8 px-3 text-sm',
                lg: 'h-9 px-4 text-sm',
            };
            return textOnlySizes[size];
        } else {
            // Icon only button (default behavior)
            const iconOnlySizes = {
                sm: 'h-7 w-7 p-0',
                default: 'h-8 w-8 p-0',
                lg: 'h-9 w-9 p-0',
            };
            return iconOnlySizes[size];
        }
    };

    // Determine which icon to show
    const IconToRender = TriggerIcon || MoreHorizontal;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    className={`${getButtonClasses()} group transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${triggerClassName}`}
                >
                    <span className="sr-only">{triggerText ? `${triggerText} menu` : 'Open actions menu'}</span>

                    {/* Render icon if we have one (either custom or default) */}
                    {(TriggerIcon || !triggerText) && <IconToRender className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />}

                    {/* Render text if provided */}
                    {triggerText && <span className="font-medium">{triggerText}</span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                className="w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                sideOffset={8}
            >
                {showLabel && (
                    <>
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />
                    </>
                )}

                {/* Primary actions */}
                {primaryActions.length > 0 && (
                    <div className="space-y-1">{primaryActions.map((action, index) => renderAction(action, `primary-${index}`))}</div>
                )}

                {/* Separator between primary and secondary */}
                {primaryActions.length > 0 && secondaryActions.length > 0 && (
                    <DropdownMenuSeparator className="my-2 bg-slate-200 dark:bg-slate-700" />
                )}

                {/* Secondary actions */}
                {secondaryActions.length > 0 && (
                    <div className="space-y-1">{secondaryActions.map((action, index) => renderAction(action, `secondary-${index}`))}</div>
                )}

                {/* Separator before destructive actions */}
                {(primaryActions.length > 0 || secondaryActions.length > 0) && deleteActions.length > 0 && (
                    <DropdownMenuSeparator className="my-2 bg-slate-200 dark:bg-slate-700" />
                )}

                {/* Destructive actions */}
                {deleteActions.length > 0 && (
                    <div className="space-y-1">{deleteActions.map((action, index) => renderAction(action, `delete-${index}`))}</div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsDropdown;
