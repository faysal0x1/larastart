import { Head } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/layouts/app-layout.jsx';

export default function RecentTransactions({ auth, title, transactions }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                                <div className="flex gap-4">
                                    <Select defaultValue="today">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Date Range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="yesterday">Yesterday</SelectItem>
                                            <SelectItem value="this_week">This Week</SelectItem>
                                            <SelectItem value="this_month">This Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        placeholder="Search by invoice..."
                                        className="w-[300px]"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map(transaction => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.invoiceNo}</TableCell>
                                            <TableCell>
                                                {transaction.contact ? transaction.contact.name : 'Walk-in Customer'}
                                            </TableCell>
                                            <TableCell>{transaction.items.length}</TableCell>
                                            <TableCell>${transaction.total.toFixed(2)}</TableCell>
                                            <TableCell>{transaction.payment_method}</TableCell>
                                            <TableCell>
                                                {new Date(transaction.transaction_date).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleViewInvoice(transaction.id)}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handlePrintInvoice(transaction.id)}
                                                    >
                                                        Print
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

const handleViewInvoice = (transactionId) => {
    // Implement view invoice functionality
    console.log('Viewing invoice:', transactionId);
};

const handlePrintInvoice = (transactionId) => {
    // Implement print invoice functionality
    console.log('Printing invoice:', transactionId);
};
