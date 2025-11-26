import Can from '@/components/permissions/Can.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';

const ExportButton = ({ routeName, label }) => (
    <Can permission="users.export">
        <Link href={route(routeName)}>
            <Button variant="outline" className="flex items-center gap-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                <Download className="h-4 w-4" />
                {label}
            </Button>
        </Link>
    </Can>
);
export default ExportButton;
