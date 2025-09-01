import { Menu } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Balance } from '@/components/Balance.jsx';

export function MobileMenu() {
    const navItems = [
        {
            href: route('employer.dashboard'),
            label: 'Dashboard',
            current: 'employer.dashboard'
        },
        {
            href: route('jobList'),
            label: 'My Jobs',
            current: 'jobList'
        },
        {
            href: '/findWork',
            label: 'Find Work',
            current: 'findWork'
        },
        {
            href: route('blogs'),
            label: 'Blog',
            current: 'blogs'
        }
    ];

    return (
        <Sheet>
            <SheetTrigger className="p-2 text-gray-500 hover:text-gray-700 md:hidden">
                <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] pt-10 sm:w-[400px]">
                <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.current}
                            href={item.href}
                            className={
                                route().current(item.current)
                                    ? 'border-l-2 border-blue-500 py-2 pl-3 text-gray-900'
                                    : 'py-2 pl-3 text-gray-500 hover:text-gray-700'
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Balance />
                </div>
            </SheetContent>
        </Sheet>
    );
}
