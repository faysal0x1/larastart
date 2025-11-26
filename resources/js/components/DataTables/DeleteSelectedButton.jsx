import Can from '@/components/permissions/Can.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Trash2 } from 'lucide-react';

const DeleteSelectedButton = ({ routeName, label, selectedRows = [], onDelete }) => {
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            alert('Please select at least one item to delete.');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedRows.length} selected item(s)?`)) {
            if (onDelete) {
                onDelete(selectedRows);
            } else {
                // Default behavior - navigate to route with selected IDs
                const selectedIds = selectedRows.map((row) => row.id);
                router.delete(route(routeName), {
                    data: { ids: selectedIds },
                    onSuccess: () => {
                        // Handle success (toast notification, etc.)
                    },
                });
            }
        }
    };

    return (
        <Can permission="users.delete">
            <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
                className="flex items-center gap-2 disabled:opacity-50"
            >
                <Trash2 className="h-4 w-4" />
                {label} {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>
        </Can>
    );
};

export default DeleteSelectedButton;
