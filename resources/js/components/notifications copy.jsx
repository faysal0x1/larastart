import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Loader2, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export function Notifications({ initialUnreadCount = 0 }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch notifications from database
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await fetch('/notifications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications || []);
                setUnreadCount(data.unread_count || 0);
            } else {
                console.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

        // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/notifications/${notificationId}/mark-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });

            if (response.ok) {
                // Update local state
                setNotifications(prev => 
                    prev.map(n => 
                        n.id === notificationId ? { ...n, read_at: new Date().toISOString() } : n
                    )
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const response = await fetch('/api/notifications/mark-all-read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });

            if (response.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
                setUnreadCount(0);
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    // Handle notification click
    const handleNotificationClick = (notification) => {
        // Mark as read if not already read
        if (!notification.read_at) {
            markAsRead(notification.id);
        }

        // Handle different notification types
        if (notification.data?.action_url) {
            router.visit(notification.data.action_url);
        } else if (notification.data?.type === 'job_posted') {
            router.visit(`/admin/micro-tasks/${notification.data.job_id}`);
        } else if (notification.data?.type === 'job_status_updated') {
            router.visit(`/employee/jobDetails/${notification.data.job_slug || ''}`);
        }
    };

    // Format time ago
    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return 'Just now';

        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - notificationTime) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
        return `${Math.floor(diffInSeconds / 2592000)}mo`;
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
            case 'job_approved':
            case 'submission_approved':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'warning':
            case 'job_rejected':
            case 'submission_rejected':
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case 'error':
            case 'job_hard_rejected':
            case 'submission_hard_rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'info':
            case 'job_posted':
            case 'job_status_updated':
            default:
                return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    // Group notifications by time
    const groupNotifications = () => {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const newNotifications = notifications.filter(n =>
            !n.read_at || new Date(n.created_at) > oneDayAgo
        );
        const earlierNotifications = notifications.filter(n =>
            n.read_at && new Date(n.created_at) <= oneDayAgo
        );

        return { newNotifications, earlierNotifications };
    };

    // Fetch notifications when dropdown opens
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    // Initial fetch
    useEffect(() => {
        fetchNotifications();
    }, []);

    const { newNotifications, earlierNotifications } = groupNotifications();

    return (
        <>
            <DropdownMenu
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DropdownMenuTrigger asChild>
                    <div className="relative">
                        <button className="rounded-full p-2 text-gray-500 hover:text-gray-700" aria-label="Notifications">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[500px] w-screen overflow-y-auto p-0 sm:w-96">
                    <DropdownMenuLabel className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
                        <span className="font-semibold">Notifications</span>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                            >
                                Mark all as read
                            </button>
                        )}
                    </DropdownMenuLabel>

                    <div className="border-b px-4 py-2">
                        <div className="flex space-x-4">
                            <span className="font-medium text-gray-900">All</span>
                            {unreadCount > 0 && (
                                <span className="font-medium text-blue-600">Unread ({unreadCount})</span>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                            <span className="ml-2 text-gray-500">Loading notifications...</span>
                        </div>
                    ) : (
                        <>
                            {/* New Notifications Section */}
                            {newNotifications.length > 0 && (
                                <>
                                    <div className="bg-gray-50 px-4 py-2">
                                        <span className="text-sm font-medium text-gray-500">New</span>
                                    </div>
                                    {newNotifications.map((notification) => (
                                        <DropdownMenuItem
                                            key={notification.id}
                                            className={`flex items-start px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                                                !notification.read_at ? 'bg-blue-50' : ''
                                            }`}
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <div className="mt-1 mr-3">
                                                {getNotificationIcon(notification.data?.type || notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`${
                                                    !notification.read_at ? 'font-semibold' : 'font-normal'
                                                } text-gray-900 text-sm leading-relaxed`}>
                                                    {notification.data?.message || notification.data?.subject || 'New notification'}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {formatTimeAgo(notification.created_at)}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <div className="ml-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </>
                            )}

                            {/* Earlier Notifications Section */}
                            {earlierNotifications.length > 0 && (
                                <>
                                    <div className="bg-gray-50 px-4 py-2">
                                        <span className="text-sm font-medium text-gray-500">Earlier</span>
                                    </div>
                                    {earlierNotifications.map((notification) => (
                                        <DropdownMenuItem
                                            key={notification.id}
                                            className="flex items-start px-4 py-3 cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <div className="mt-1 mr-3">
                                                {getNotificationIcon(notification.data?.type || notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-normal text-gray-900 text-sm leading-relaxed">
                                                    {notification.data?.message || notification.data?.subject || 'Notification'}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {formatTimeAgo(notification.created_at)}
                                                </p>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </>
                            )}

                            {notifications.length === 0 && (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                    <p>No notifications yet</p>
                                    <p className="text-xs">We'll notify you when something important happens</p>
                                </div>
                            )}
                        </>
                    )}

                    {notifications.length > 0 && (
                        <div className="border-t px-4 py-2 text-center">
                            <button
                                onClick={() => router.visit('/notifications')}
                                className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                            >
                                See all notifications
                            </button>
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
