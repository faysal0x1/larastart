import React from 'react';
import { Link } from '@inertiajs/react';

export default function ChatList({ conversations, onSelect }) {
    return (
        <div className="divide-y divide-gray-200 overflow-y-auto">
            {conversations.map((conversation) => (
                <Link href={route('chat.show', conversation.id)} key={conversation.id} className="block p-4 hover:bg-gray-50" onClick={onSelect}>
                    <div className="flex items-center">
                        {conversation.is_group ? (
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <span className="font-medium text-indigo-800">{conversation.title.substring(0, 2).toUpperCase()}</span>
                            </div>
                        ) : (
                            <img
                                className="h-10 w-10 rounded-full"
                                src={conversation.participants[0]?.profile_photo_url}
                                alt={conversation.participants[0]?.name}
                            />
                        )}

                        <div className="ml-3 overflow-hidden">
                            <p className="truncate text-sm font-medium text-gray-900">
                                {conversation.is_group ? conversation.title : conversation.participants[0]?.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">{conversation.latest_message?.body || 'No messages yet'}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}