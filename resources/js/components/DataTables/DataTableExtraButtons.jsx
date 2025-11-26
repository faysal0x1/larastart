import DeleteSelectedButton from '@/components/DataTables/DeleteSelectedButton.jsx';
import BatchDeleteButton from '@/components/DataTables/BatchDeleteButton.jsx';
import ExportButton from '@/components/DataTables/ExportButton.jsx';
import ExportSelectedButton from '@/components/DataTables/ExportSelectedButton.jsx';
import ImportButton from '@/components/DataTables/ImportButton.jsx';

const DataTableExtraButtons = ({ dataTableExtraFeatures = {}, selectedRows = [], onExportSelected, onDeleteSelected }) => {
    const features = Object.entries(dataTableExtraFeatures);

    if (features.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {features.map(([key, feature]) => {
                switch (key) {
                    case 'import':
                        return <ImportButton key={key} routeName={feature.routeName} label={feature.label} />;

                    case 'export':
                        return <ExportButton key={key} routeName={feature.routeName} label={feature.label} />;

                    case 'export-selected':
                        return (
                            <ExportSelectedButton
                                key={key}
                                routeName={feature.routeName}
                                label={feature.label}
                                selectedRows={selectedRows}
                                onExport={onExportSelected}
                            />
                        );

                    case 'delete-selected':
                        return (
                            <BatchDeleteButton
                                key={key}
                                routeName={feature.routeName}
                                label={feature.label}
                                selectedRows={selectedRows}
                                onDelete={onDeleteSelected}
                                permission={feature.permission}
                                confirmMessage={feature.confirmMessage}
                                successMessage={feature.successMessage}
                                errorMessage={feature.errorMessage}
                                idAccessor={feature.idAccessor}
                                additionalData={feature.additionalData}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default DataTableExtraButtons;
