import { DollarSign, HelpCircle, Mail, Menu } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Notifications } from '@/components/notifications.jsx';

// JSON data for notifications and messages

const messageData = [
    { id: 1, sender: 'Client A', text: 'About the project deadline...', read: false, time: '1 hour ago' },
    { id: 2, sender: 'Client B', text: 'Can we schedule a call?', read: false, time: '3 hours ago' },
    { id: 3, sender: 'Support Team', text: 'Your ticket has been resolved', read: true, time: '2 days ago' },
];

export function EmployeeNavbar({ dp, initialUnreadNotifications = 4, initialUnreadMessages = 2, loyaltyPoints = 150 }) {
    // State for notifications and messages
    const [unreadMessages, setUnreadMessages] = useState(initialUnreadMessages);
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState(messageData);

    const markMessagesAsRead = () => {
        const updatedMessages = messages.map((m) => ({ ...m, read: true }));
        setMessages(updatedMessages);
        setUnreadMessages(0);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <Sheet>
                            <SheetTrigger className="p-2 text-gray-500 hover:text-gray-700 md:hidden">
                                <Menu className="h-5 w-5" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] pt-10 sm:w-[400px]">
                                <div className="flex flex-col space-y-4">
                                    <Link
                                        href="/employeeDashboard"
                                        className={
                                            route().current('employeeDashboard')
                                                ? 'border-l-2 border-blue-500 py-2 pl-3 text-gray-900'
                                                : 'py-2 pl-3 text-gray-500 hover:text-gray-700'
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/employeeJobsList"
                                        className={
                                            route().current('employeeJobsList')
                                                ? 'border-l-2 border-blue-500 py-2 pl-3 text-gray-900'
                                                : 'py-2 pl-3 text-gray-500 hover:text-gray-700'
                                        }
                                    >
                                        My Jobs
                                    </Link>
                                    <Link
                                        href="/findWork"
                                        className={
                                            route().current('findWork')
                                                ? 'border-l-2 border-blue-500 py-2 pl-3 text-gray-900'
                                                : 'py-2 pl-3 text-gray-500 hover:text-gray-700'
                                        }
                                    >
                                        Find Work
                                    </Link>
                                    <Link
                                        href={route('loginEx')}
                                        className={
                                            route().current('loginEx')
                                                ? 'border-l-2 border-blue-500 py-2 pl-3 text-gray-900'
                                                : 'py-2 pl-3 text-gray-500 hover:text-gray-700'
                                        }
                                    >
                                        Analytics
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Link href={route('home')} className="text-xl font-bold text-gray-800 md:text-2xl">
                            MicroJobs<span className="text-blue-600">.</span>
                        </Link>
                    </div>

                    {/* Desktop navigation links - hidden on mobile */}
                    <div className="hidden items-center space-x-8 md:flex">
                        <div className="hidden space-x-6 md:flex">
                            <Link
                                href="/employeeDashboard"
                                className={
                                    route().current('employeeDashboard')
                                        ? 'flex h-12 items-center rounded-none border-b-2 border-blue-500 text-gray-900'
                                        : 'flex h-12 items-center rounded-none text-gray-500 hover:text-gray-700'
                                }
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/employeeJobsList"
                                className={
                                    route().current('employeeJobsList')
                                        ? 'flex h-12 items-center rounded-none border-b-2 border-blue-500 text-gray-900'
                                        : 'flex h-12 items-center rounded-none text-gray-500 hover:text-gray-700'
                                }
                            >
                                My Jobs
                            </Link>
                            <Link
                                href="/findWork"
                                className={
                                    route().current('findWork')
                                        ? 'flex h-12 items-center rounded-none border-b-2 border-blue-500 text-gray-900'
                                        : 'flex h-12 items-center rounded-none text-gray-500 hover:text-gray-700'
                                }
                            >
                                Find Work
                            </Link>
                            <Link
                                href={route('loginEx')}
                                className={
                                    route().current('loginEx')
                                        ? 'flex h-12 items-center rounded-none border-b-2 border-blue-500 text-gray-900'
                                        : 'flex h-12 items-center rounded-none text-gray-500 hover:text-gray-700'
                                }
                            >
                                Analytics
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Loyalty Points - hidden on small mobile */}
                        <div className="hidden items-center rounded-full bg-blue-50 px-2 py-1 sm:flex md:px-3">
                            <DollarSign className="mr-1 h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700 md:text-sm">{loyaltyPoints} points</span>
                        </div>

                        {/* Disposable Dollar Button - hidden on mobile */}
                        <button className="hidden items-center rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white hover:bg-green-600 sm:flex md:px-3 md:text-sm">
                            <DollarSign className="mr-1 h-4 w-4" />
                            <span className="hidden md:inline">Withdraw</span>
                        </button>

                        <Notifications />
                        {/*<Notifications unreadNotifications={unreadNotifications} newNotifications={newNotifications} />*/}

                        {/* Notifications Dropdown */}
                        {/*<DropdownMenu onOpenChange={(open) => {*/}
                        {/*  if (open) markNotificationsAsRead()*/}
                        {/*}}>*/}
                        {/*  <DropdownMenuTrigger asChild>*/}
                        {/*    <div className="relative">*/}
                        {/*      <button*/}
                        {/*        className="text-gray-500 hover:text-gray-700 p-2 rounded-full"*/}
                        {/*        aria-label="Notifications"*/}
                        {/*      >*/}
                        {/*        <Bell className="h-5 w-5" />*/}
                        {/*        {unreadNotifications > 0 && (*/}
                        {/*          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>*/}
                        {/*        )}*/}
                        {/*      </button>*/}
                        {/*    </div>*/}
                        {/*  </DropdownMenuTrigger>*/}
                        {/*  <DropdownMenuContent align="end" className="w-screen sm:w-96 max-h-[500px] overflow-y-auto p-0">*/}
                        {/*    <DropdownMenuLabel className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">*/}
                        {/*      <span className="font-semibold">Notifications</span>*/}
                        {/*      <span className="text-sm text-blue-600 cursor-pointer">Mark all as read</span>*/}
                        {/*    </DropdownMenuLabel>*/}

                        {/*    <div className="px-4 py-2 border-b">*/}
                        {/*      <div className="flex space-x-4">*/}
                        {/*        <span className="font-medium text-gray-900">All</span>*/}
                        {/*        <span className="font-medium text-blue-600">Unread</span>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}

                        {/*    /!* New Notifications Section *!/*/}
                        {/*    {newNotifications.length > 0 && (*/}
                        {/*      <>*/}
                        {/*        <div className="px-4 py-2 bg-gray-50">*/}
                        {/*          <span className="text-sm font-medium text-gray-500">New</span>*/}
                        {/*        </div>*/}
                        {/*        {newNotifications.map((notification) => (*/}
                        {/*          <DropdownMenuItem*/}
                        {/*            key={notification.id}*/}
                        {/*            className={`px-4 py-3 flex items-start ${!notification.read ? 'bg-blue-50' : ''}`}*/}
                        {/*          >*/}
                        {/*            <div className={`w-2 h-2 rounded-full mr-3 mt-1.5 ${!notification.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>*/}
                        {/*            <div className="flex-1">*/}
                        {/*              <p className={`${!notification.read ? 'font-semibold' : 'font-normal'} text-gray-900`}>*/}
                        {/*                {notification.text}*/}
                        {/*              </p>*/}
                        {/*              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>*/}
                        {/*            </div>*/}
                        {/*          </DropdownMenuItem>*/}
                        {/*        ))}*/}
                        {/*      </>*/}
                        {/*    )}*/}

                        {/*    /!* Earlier Notifications Section *!/*/}
                        {/*    {earlierNotifications.length > 0 && (*/}
                        {/*      <>*/}
                        {/*        <div className="px-4 py-2 bg-gray-50">*/}
                        {/*          <span className="text-sm font-medium text-gray-500">Earlier</span>*/}
                        {/*        </div>*/}
                        {/*        {earlierNotifications.map((notification) => (*/}
                        {/*          <DropdownMenuItem*/}
                        {/*            key={notification.id}*/}
                        {/*            className="px-4 py-3 flex items-start"*/}
                        {/*          >*/}
                        {/*            <div className="w-2 h-2 rounded-full mr-3 mt-1.5 bg-transparent"></div>*/}
                        {/*            <div className="flex-1">*/}
                        {/*              <p className="font-normal text-gray-900">*/}
                        {/*                {notification.text}*/}
                        {/*              </p>*/}
                        {/*              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>*/}
                        {/*            </div>*/}
                        {/*          </DropdownMenuItem>*/}
                        {/*        ))}*/}
                        {/*      </>*/}
                        {/*    )}*/}

                        {/*    {notifications.length === 0 && (*/}
                        {/*      <DropdownMenuItem className="px-4 py-3 text-gray-500">*/}
                        {/*        No notifications*/}
                        {/*      </DropdownMenuItem>*/}
                        {/*    )}*/}

                        {/*    <div className="px-4 py-2 border-t text-center">*/}
                        {/*      <span className="text-sm text-blue-600 cursor-pointer">See all notifications</span>*/}
                        {/*    </div>*/}
                        {/*  </DropdownMenuContent>*/}
                        {/*</DropdownMenu>*/}

                        {/* Messages Dropdown */}
                        <DropdownMenu
                            onOpenChange={(open) => {
                                if (open) markMessagesAsRead();
                                setShowMessages(open);
                            }}
                        >
                            <DropdownMenuTrigger asChild>
                                <div className="relative">
                                    <button className="rounded-full p-2 text-gray-500 hover:text-gray-700" aria-label="Messages">
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
                                    {unreadMessages > 0 && <Badge variant="destructive">{unreadMessages} new</Badge>}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {messages.length > 0 ? (
                                    messages.map((message) => (
                                        <DropdownMenuItem key={message.id} className={`py-2 ${!message.read ? 'bg-blue-50' : ''}`}>
                                            <div className="flex flex-col">
                                                <p className="font-medium">{message.sender}</p>
                                                <p className="truncate text-sm">{message.text}</p>
                                                <p className="text-xs text-gray-500">{message.time}</p>
                                            </div>
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem className="py-2 text-gray-500">No messages</DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="justify-center text-center text-blue-600">View All Messages</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="rounded-full p-2 text-gray-500 hover:text-gray-700" aria-label="Help">
                            <HelpCircle className="h-5 w-5" />
                        </button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                    <AvatarImage src={dp} alt="User profile" />
                                    <AvatarFallback>AJ</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={route('e-profile')}>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                <Link href={route('setting')}>
                                    {' '}
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                </Link>
                                <Link href={route('blogs')}>
                                    {' '}
                                    <DropdownMenuItem>Blog</DropdownMenuItem>
                                </Link>

                                <DropdownMenuSeparator />
                                <Link href={route('logout')}>
                                    {' '}
                                    <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>{' '}
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}