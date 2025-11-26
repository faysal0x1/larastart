import AppearanceTabs from '@/components/appearance-tabs';
import ClearCacheButton from '@/components/ClearCacheButton';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Globe } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="flex items-center gap-2">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs cursor-pointer">
                            <Globe className="size-4" />
                        </Button>
                    </a>
                    <ClearCacheButton
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                    />
                    <AppearanceTabs />

                </div>
            </div>
        </header>
    );
}
