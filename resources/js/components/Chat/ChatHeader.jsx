import React from 'react';
import { FiMenu } from 'react-icons/fi';
import DarkModeToggle from '@/components/DarkModeToggle.jsx';

export default function ChatHeader({ conversation, selectedUser, onMenuClick, darkMode, toggleDarkMode }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="mr-2 text-gray-500 hover:text-gray-700 md:hidden dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FiMenu className="h-6 w-6" />
                </button>

                {conversation.is_group ? (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                        <span className="font-medium text-indigo-800 dark:text-indigo-200">{conversation.title.substring(0, 2).toUpperCase()}</span>
                    </div>
                ) : (
                    <img
                        className="h-10 w-10 rounded-full"
                        src={selectedUser?.profile_photo_url || conversation.participants[0]?.profile_photo_url}
                        alt={selectedUser?.name || conversation.participants[0]?.name}
                    />
                )}

                <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {conversation.is_group ? conversation.title : selectedUser?.name || conversation.participants[0]?.name}
                    </h3>
                    {conversation.is_group ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {conversation.participants.length} {conversation.participants.length === 1 ? 'member' : 'members'}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser?.email || conversation.participants[0]?.email}</p>
                    )}
                </div>
            </div>

            <DarkModeToggle />
        </div>
    );
}