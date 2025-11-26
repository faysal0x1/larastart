import React from 'react';
import { Head } from '@inertiajs/react';

import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/layouts/app-layout.jsx';

export default function Reports({ auth, title }) {
    return (
        <AppLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">{title}</h2>}>
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Date Range Selector */}
                    <div className="mb-6">
                        <Select defaultValue="this_month">
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select Date Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">Yesterday</SelectItem>
                                <SelectItem value="this_week">This Week</SelectItem>
                                <SelectItem value="this_month">This Month</SelectItem>
                                <SelectItem value="last_month">Last Month</SelectItem>
                                <SelectItem value="this_year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Summary Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader>
                                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">$0.00</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">0</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-sm font-medium text-gray-500">Average Transaction</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">$0.00</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-sm font-medium text-gray-500">Total Products Sold</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">0</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Selling Products */}
                    <Card className="mb-6">
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Top Selling Products</h3>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity Sold</TableHead>
                                        <TableHead>Total Revenue</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Sales Over Time */}
                    <Card className="mb-6">
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Sales Over Time</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[300px] items-center justify-center">
                                <p className="text-gray-500">Chart will be displayed here</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily Sales Breakdown */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Daily Sales Breakdown</h3>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Hour</TableHead>
                                        <TableHead>Total Sales</TableHead>
                                        <TableHead>Transaction Count</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}