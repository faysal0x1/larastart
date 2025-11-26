import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import AppLayout from '@/layouts/app-layout.jsx';

export default function HoldList({ auth, title, holds }) {
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
                                <h3 className="text-lg font-semibold">Held Transactions</h3>
                                <Input
                                    placeholder="Search by reference..."
                                    className="w-[300px]"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Reference</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {holds.map(hold => (
                                        <TableRow key={hold.id}>
                                            <TableCell>{hold.reference_no}</TableCell>
                                            <TableCell>
                                                {hold.customer ? hold.customer.name : 'Walk-in Customer'}
                                            </TableCell>
                                            <TableCell>{hold.items.length}</TableCell>
                                            <TableCell>${hold.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                {new Date(hold.created_at).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleResume(hold.id)}
                                                    >
                                                        Resume
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(hold.id)}
                                                    >
                                                        Delete
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

const handleResume = (holdId) => {
    // Implement resume functionality
    console.log('Resuming hold:', holdId);
};

const handleDelete = (holdId) => {
    // Implement delete functionality
    console.log('Deleting hold:', holdId);
};