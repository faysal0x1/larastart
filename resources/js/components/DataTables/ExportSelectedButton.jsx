import Can from '@/components/permissions/Can.jsx';
import { Button } from '@/components/ui/button.jsx';
import { router } from '@inertiajs/react';
import { FileDown } from 'lucide-react';

const ExportSelectedButton = ({ routeName, label, selectedRows = [], onExport }) => {
    const handleExportSelected = () => {
        if (selectedRows.length === 0) {
            alert('Please select at least one item to export.');
            return;
        }

        if (onExport) {
            onExport(selectedRows);
        } else {
            const selectedIds = selectedRows.map((row) => row.id);
            router.post(route(routeName), { ids: selectedIds });
        }
    };

    return (
        <Can permission="users.export">
            <Button
                variant="outline"
                onClick={handleExportSelected}
                disabled={selectedRows.length === 0}
                className="flex items-center gap-2 disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
                <FileDown className="h-4 w-4" />
                {label} {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>
        </Can>
    );
};

export default ExportSelectedButton;
