import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MessagesDropdown() {
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
        const intervalId = setInterval(fetchMessages, 30000); // Check every 30 seconds
        return () => clearInterval(intervalId);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(route('web.fetch.messages'), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages(data.messages || []);
            setUnreadMessages(data.unreadCount || 0);
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Fallback to empty state
            setMessages([]);
            setUnreadMessages(0);
        } finally {
            setLoading(false);
        }
    };

    const markMessagesAsRead = async () => {
        try {
            await fetch(route('web.messages.mark-read'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            // Update local state
            const updatedMessages = messages.map((m) => ({ ...m, read: true }));
            setMessages(updatedMessages);
            setUnreadMessages(0);
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open && unreadMessages > 0) {
                    markMessagesAsRead();
                }
            }}
        >
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <button
                        className="rounded-full p-2 text-gray-500 hover:text-gray-700"
                        aria-label="Messages"
                    >
                        <Mail className="h-5 w-5" />
                        {unreadMessages > 0 && (
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {unreadMessages}
                            </span>
                        )}
                    </button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-96 w-screen overflow-y-auto sm:w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    Messages
                    {unreadMessages > 0 && (
                        <Badge variant="destructive">{unreadMessages} new</Badge>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {loading ? (
                    <DropdownMenuItem className="py-2 text-gray-500">
                        Loading messages...
                    </DropdownMenuItem>
                ) : messages.length > 0 ? (
                    messages.map((message) => (
                        <DropdownMenuItem
                            key={message.id}
                            className={`py-2 ${!message.read ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex flex-col">
                                <p className="font-medium">{message.sender}</p>
                                <p className="truncate text-sm">{message.text}</p>
                                <p className="text-xs text-gray-500">{message.time}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <DropdownMenuItem className="py-2 text-gray-500">
                        No messages
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center text-blue-600">
                    View All Messages
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
