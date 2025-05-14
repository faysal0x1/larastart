import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserList({ users, onSelect, selectedUserId }) {
    return (
        <div className="space-y-2">
            {users.map((user) => (
                <Link
                    key={user.id}
                    href={route('chat.start', { user_id: user.id })}
                    method="post"
                    as="button"
                    className={`flex w-full items-center rounded-lg p-2 text-left ${selectedUserId === user.id ? 'bg-indigo-100 dark:bg-indigo-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => onSelect(user)}
                >
                    <img className="h-8 w-8 rounded-full" src={user.profile_photo_url} alt={user.name} />
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                </Link>
            ))}
        </div>
    );
}