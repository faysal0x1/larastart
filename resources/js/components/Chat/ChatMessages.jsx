import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { usePage } from '@inertiajs/react';

export default function ChatMessages({ messages, onLoadMore, darkMode }) {
    const { auth } = usePage().props;
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);
    const [isNearTop, setIsNearTop] = useState(false);

    // Create a reversed copy of the messages array
    const reversedMessages = [...messages].reverse();

    // Scroll to bottom on new messages
    useEffect(() => {
        if (!isNearTop) {
            scrollToBottom();
        }
    }, [messages]);

    // Handle scroll position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop } = container;
            setIsNearTop(scrollTop < 100);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900" style={{ scrollBehavior: 'smooth' }}>
            <div className="space-y-4">
                {/* Load more button at the top */}
                {isNearTop && messages.length > 10 && (
                    <div className="flex justify-center">
                        <button
                            onClick={onLoadMore}
                            className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                        >
                            Load older messages
                        </button>
                    </div>
                )}

                {reversedMessages.map((message) => {
                    const isCurrentUser = message.user_id === auth.user.id;

                    return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] rounded-xl px-4 py-2 ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm dark:bg-gray-700 dark:text-white'}`}
                            >
                                {!isCurrentUser && <p className="text-xs font-medium text-gray-500 dark:text-gray-300">{message.user.name}</p>}
                                <p className="break-words whitespace-pre-wrap">{message.body}</p>
                                <p className={`mt-1 text-right text-xs ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {format(new Date(message.created_at), 'h:mm a')}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}