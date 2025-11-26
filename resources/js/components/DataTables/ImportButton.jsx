import { Button } from '@/components/ui/button.jsx';
import { Link } from '@inertiajs/react';
import { Upload } from 'lucide-react';

const ImportButton = ({ routeName, label }) => (
    // <Can permission="users.import">
    <Link href={route(routeName)}>
        <Button variant="outline" className="flex items-center gap-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
            <Upload className="h-4 w-4" />
            {label}
        </Button>
    </Link>
    // </Can>
);

export default ImportButton;
