import ChatHeader from '@/components/Chat/ChatHeader';
import ChatList from '@/components/Chat/ChatList.jsx';
import ChatMessages from '@/components/Chat/ChatMessages';
import UserList from '@/components/Chat/UserList.jsx';
import DarkModeToggle from '@/components/DarkModeToggle.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FiMenu, FiMessageSquare, FiPlus, FiUsers, FiX } from 'react-icons/fi';

export default function ChatShow() {
    const { conversation, allConversations, messages: initialMessages, users, auth } = usePage().props;
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [messages, setMessages] = useState(initialMessages.data);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState('chat');
    const [selectedUser, setSelectedUser] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        // Check for saved preference or system preference
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) return savedMode === 'true';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    const { data, setData, post, reset, processing } = useForm({
        body: '',
    });

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Handle new WebSocket messages
    useEffect(() => {
        if (!window.Echo) return;

        const channel = window.Echo.private(`conversation.${conversation.id}`);
        channel.listen('.new-message', (event) => {
            const newMessage = event.message;
            setMessages((prev) => [newMessage, ...prev]);
        });

        return () => {
            channel.stopListening('.new-message');
            window.Echo.leave(`conversation.${conversation.id}`);
        };
    }, [conversation.id]);

    // Handle sending a new message
    const submit = (e) => {
        e.preventDefault();

        if (!data.body.trim() || processing) return;

        const optimisticMessage = {
            id: 'temp-' + Date.now(),
            body: data.body,
            created_at: new Date().toISOString(),
            user_id: auth.user.id,
            user: {
                id: auth.user.id,
                name: auth.user.name,
            },
        };

        setMessages((prev) => [optimisticMessage, ...prev]);

        post(route('chat.message.store', conversation.id), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
            },
        });
    };

    // Handle pagination when scrolling up
    const handleLoadMore = () => {
        if (initialMessages.next_page_url) {
            axios.get(initialMessages.next_page_url).then((response) => {
                setMessages((prev) => [...prev, ...response.data.data]);
            });
        }
    };

    // Set selected user when a conversation is loaded
    useEffect(() => {
        if (!conversation.is_group && conversation.participants?.length > 0) {
            setSelectedUser(conversation.participants[0]);
        }
    }, [conversation]);

    return (
        <AppLayout>
            <Head title={conversation.is_group ? conversation.title : conversation.participants[0]?.name} />

            <div className="flex h-[calc(100vh-65px)] dark:bg-gray-900">
                {/* Mobile sidebar toggle button */}
                <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="fixed bottom-4 left-4 z-20 rounded-full bg-indigo-600 p-3 text-white shadow-lg md:hidden"
                >
                    <FiMenu className="h-6 w-6" />
                </button>

                {/* Sidebar - Mobile */}
                {mobileSidebarOpen && (
                    <div className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden">
                        <div className="absolute top-0 left-0 h-full w-4/5 bg-white shadow-lg dark:bg-gray-800">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                                    <h2 className="text-xl font-semibold dark:text-white">Chat</h2>
                                    <div className="flex items-center space-x-2">
                                        <DarkModeToggle />

                                        <button
                                            onClick={() => setMobileSidebarOpen(false)}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            <FiX className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => setActiveView('chat')}
                                        className={`flex-1 py-2 text-center font-medium ${activeView === 'chat' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        <FiMessageSquare className="mx-auto mb-1 h-5 w-5" />
                                        Chats
                                    </button>
                                    <button
                                        onClick={() => setActiveView('users')}
                                        className={`flex-1 py-2 text-center font-medium ${activeView === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        <FiUsers className="mx-auto mb-1 h-5 w-5" />
                                        Users
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {activeView === 'chat' ? (
                                        <>
                                            <div className="p-4">
                                                <button
                                                    onClick={() => setShowGroupModal(true)}
                                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                                                >
                                                    <FiPlus className="h-4 w-4" />
                                                    New Group
                                                </button>
                                            </div>
                                            <ChatList
                                                conversations={allConversations}
                                                onSelect={() => setMobileSidebarOpen(false)}
                                                selectedConversationId={conversation.id}
                                            />
                                        </>
                                    ) : (
                                        <div className="p-4">
                                            <UserList
                                                users={users}
                                                onSelect={(user) => {
                                                    setSelectedUser(user);
                                                    setMobileSidebarOpen(false);
                                                }}
                                                selectedUserId={selectedUser?.id}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar - Desktop */}
                <div className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                        <h2 className="text-xl font-semibold dark:text-white">Chats</h2>
                        <div className="flex items-center space-x-2">
                            <DarkModeToggle />
                        </div>
                    </div>

                    <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                        <button
                            onClick={() => setShowGroupModal(true)}
                            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            <FiPlus className="h-4 w-4" />
                            New Group
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <ChatList conversations={allConversations} selectedConversationId={conversation.id} />

                        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                            <h3 className="flex items-center gap-2 font-medium dark:text-white">
                                <FiUsers className="h-4 w-4" />
                                All Users
                            </h3>
                            <UserList users={users} onSelect={(user) => setSelectedUser(user)} selectedUserId={selectedUser?.id} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 flex-col">
                    <ChatHeader
                        conversation={conversation}
                        selectedUser={selectedUser}
                        onMenuClick={() => setMobileSidebarOpen(true)}
                        darkMode={darkMode}
                    />

                    <ChatMessages messages={messages} onLoadMore={handleLoadMore} darkMode={darkMode} />

                    <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <form onSubmit={submit} className="flex gap-2">
                            <input
                                type="text"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                placeholder="Type a message..."
                                className="focus:ring-opacity-50 flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                required
                            />
                            <button
                                type="submit"
                                disabled={processing || !data.body.trim()}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:bg-indigo-400 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-900"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
