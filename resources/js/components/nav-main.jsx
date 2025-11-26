import Can from '@/Components/Permissions/Can';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.jsx';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavMain({ items = [] }) {
    const page = usePage();
    const currentFullUrl = page.url;
    const currentPath = currentFullUrl.split('?')[0];
    const [expandedItems, setExpandedItems] = useState({});

    const isUrlActive = (itemUrl) => {
        if (!itemUrl) return false;
        const itemPath = itemUrl.split('?')[0];
        return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
    };

    const isItemActive = (item) => {
        if (item.url && isUrlActive(item.url)) return true;
        if (item.subItems) {
            return item.subItems.some((subItem) => subItem.url && isUrlActive(subItem.url));
        }
        return false;
    };

    useEffect(() => {
        const newExpandedState = {};
        items.forEach((item) => {
            if (item.subItems && item.subItems.some((subItem) => subItem.url && isUrlActive(subItem.url))) {
                newExpandedState[item.title] = true;
            }
        });
        setExpandedItems((prev) => ({ ...prev, ...newExpandedState }));
    }, [currentPath, items]);

    const toggleItem = (title) => {
        setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    const activeClass = 'bg-secondary/20 text-foreground font-medium';

    // Helper component to handle permission checks
    const ProtectedNavItem = ({ item, children }) => {
        if (item.permission) {
            return <Can permission={item.permission}>{children}</Can>;
        }
        return children;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <ProtectedNavItem key={item.title} item={item}>
                        <SidebarMenuItem>
                            {item.subItems ? (
                                <>
                                    <SidebarMenuButton
                                        onClick={() => toggleItem(item.title)}
                                        className={`w-full justify-between rounded-md transition-all ${isItemActive(item) ? activeClass : ''}`}
                                    >
                                        <div className="flex items-center">
                                            {item.icon && (
                                                <span className="text-inherit">
                                                    <item.icon className={`mr-2 h-4 w-4 ${isItemActive(item) ? 'text-secondary' : ''}`} />
                                                </span>
                                            )}
                                            <span>{item.title}</span>
                                        </div>
                                        {expandedItems[item.title] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                    </SidebarMenuButton>

                                    {expandedItems[item.title] && (
                                        <div className="mt-1 ml-6 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <ProtectedNavItem key={subItem.title} item={subItem}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`w-full rounded-md transition-all ${isUrlActive(subItem.url) ? activeClass : ''}`}
                                                    >
                                                        <Link href={subItem.url} prefetch className="flex items-center">
                                                            {subItem.icon && (
                                                                <span className="text-inherit">
                                                                    <subItem.icon
                                                                        className={`mr-2 h-4 w-4 ${isUrlActive(subItem.url) ? 'text-secondary' : ''}`}
                                                                    />
                                                                </span>
                                                            )}
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </ProtectedNavItem>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <SidebarMenuButton asChild className={`rounded-md transition-all ${isUrlActive(item.url) ? activeClass : ''}`}>
                                    <Link href={item.url} prefetch className="flex items-center">
                                        {item.icon && (
                                            <span className="mr-2 inline-flex">
                                                <item.icon className="h-4 w-4" />
                                            </span>
                                        )}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    </ProtectedNavItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
