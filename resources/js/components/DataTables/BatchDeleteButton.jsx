import Can from '@/components/permissions/Can.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

/**
 * Reusable batch delete button component
 *
 * @param {Object} props - Component props
 * @param {string} props.routeName - The route name for batch delete
 * @param {string} props.label - Button label text
 * @param {Array} props.selectedRows - Array of selected rows
 * @param {Function} props.onDelete - Optional custom delete handler
 * @param {string} props.permission - Permission required to show the button
 * @param {string} props.confirmMessage - Custom confirmation message
 * @param {string} props.successMessage - Custom success message
 * @param {string} props.errorMessage - Custom error message
 * @param {string} props.idAccessor - Field name to use as ID (default: 'id')
 * @param {Object} props.additionalData - Additional data to send with the request
 */
const BatchDeleteButton = ({
    routeName,
    label = 'Delete Selected',
    selectedRows = [],
    onDelete = null,
    permission = null,
    confirmMessage = null,
    successMessage = null,
    errorMessage = null,
    idAccessor = 'id',
    additionalData = {}
}) => {
    const defaultConfirmMessage = `Are you sure you want to delete ${selectedRows.length} selected item(s)?`;
    const defaultSuccessMessage = `${selectedRows.length} item(s) deleted successfully`;
    const defaultErrorMessage = 'Failed to delete selected items';

    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            toast.error('Please select at least one item to delete.');
            return;
        }

        const confirmMsg = confirmMessage || defaultConfirmMessage;

        if (confirm(confirmMsg)) {
            if (onDelete) {
                // Use custom delete handler
                onDelete(selectedRows);
            } else {
                // Default behavior - navigate to route with selected IDs
                const selectedIds = selectedRows.map((row) => row[idAccessor]);
                const payload = {
                    ids: selectedIds,
                    ...additionalData
                };

                router.delete(route(routeName), {
                    data: payload,
                    onSuccess: () => {
                        toast.success(successMessage || defaultSuccessMessage);
                    },
                    onError: (errors) => {
                        console.error('Batch delete error:', errors);
                        toast.error(errorMessage || defaultErrorMessage);
                    },
                });
            }
        }
    };

    const buttonContent = (
        <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className="flex items-center gap-2 disabled:opacity-50"
        >
            <Trash2 className="h-4 w-4" />
            {label} {selectedRows.length > 0 && `(${selectedRows.length})`}
        </Button>
    );

    // If permission is specified, wrap with Can component
    if (permission) {
        return (
            <Can permission={permission}>
                {buttonContent}
            </Can>
        );
    }

    return buttonContent;
};

export default BatchDeleteButton;
