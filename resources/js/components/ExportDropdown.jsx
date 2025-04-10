// resources/js/components/ExportDropdown.jsx
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { useState } from 'react';

/**
 * Export dropdown component with multiple format options and data scope selection
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Current visible data to export
 * @param {Array} props.columns - Table columns configuration
 * @param {Array} props.allData - All data available (for "Export All" option)
 * @param {Function} props.onExport - Optional custom export handler
 * @param {boolean} props.disabled - Whether export functionality is disabled
 * @returns {JSX.Element} Export dropdown component
 */
export function ExportDropdown({ data, columns, allData, onExport, disabled = false }) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = (format, scope) => {
        setIsExporting(true);

        try {
            const exportData = scope === 'all' && allData ? allData : data;

            if (onExport) {
                // Use custom export handler if provided
                onExport(exportData, format, scope);
                return;
            }

            // Default export implementation based on format
            switch (format) {
                case 'csv':
                    exportAsCSV(exportData, columns);
                    break;
                case 'excel':
                    exportAsCSV(exportData, columns); // Fallback to CSV
                    break;
                case 'json':
                    exportAsJSON(exportData);
                    break;
                case 'pdf':
                    exportAsJSON(exportData); // Fallback to JSON
                    break;
                default:
                    exportAsCSV(exportData, columns);
            }
        } finally {
            setIsExporting(false);
        }
    };

    // CSV export implementation
    const exportAsCSV = (dataToExport, columns) => {
        const headers = columns
            .filter((col) => col.accessorKey && col.header)
            .map((col) => (typeof col.header === 'string' ? col.header : col.accessorKey));

        const csvContent = [
            headers.join(','),
            ...dataToExport.map((row) =>
                columns
                    .filter((col) => col.accessorKey)
                    .map((col) => {
                        const value = row[col.accessorKey];
                        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
                    })
                    .join(','),
            ),
        ].join('\n');

        downloadFile(csvContent, 'text/csv;charset=utf-8;', `export-${new Date().toISOString().split('T')[0]}.csv`);
    };

    // JSON export implementation
    const exportAsJSON = (dataToExport) => {
        const jsonContent = JSON.stringify(dataToExport, null, 2);
        downloadFile(jsonContent, 'application/json', `export-${new Date().toISOString().split('T')[0]}.json`);
    };

    // Helper function to download files
    const downloadFile = (content, mimeType, filename) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportFormats = [
        { value: 'csv', label: 'CSV Format (.csv)' },
        { value: 'json', label: 'JSON Format (.json)' },
        { value: 'excel', label: 'Excel Format (.xlsx)' },
        { value: 'pdf', label: 'PDF Format (.pdf)' },
    ];

    const isAllDataAvailable = !!allData;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1" disabled={disabled || isExporting}>
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 text-sm font-medium">Export Visible Data</div>
                {exportFormats.map((format) => (
                    <DropdownMenuCheckboxItem
                        key={`current-${format.value}`}
                        className="cursor-pointer"
                        onClick={() => handleExport(format.value, 'current')}
                    >
                        {format.label}
                    </DropdownMenuCheckboxItem>
                ))}

                {isAllDataAvailable && (
                    <>
                        <div className="my-1 h-px bg-gray-200" />

                        <div className="p-2 text-sm font-medium">Export All Data</div>
                        {exportFormats.map((format) => (
                            <DropdownMenuCheckboxItem
                                key={`all-${format.value}`}
                                className="cursor-pointer"
                                onClick={() => handleExport(format.value, 'all')}
                            >
                                {format.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ExportDropdown;
