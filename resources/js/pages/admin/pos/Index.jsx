import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout.jsx';

export default function Index({ auth, title }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">POS Cart</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">Start a new sale or continue with an existing one.</p>
                                <Link href={route('admin.pos.cart')}>
                                    <Button>Open POS Cart</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Reports</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">View sales reports and analytics.</p>
                                <Link href={route('admin.pos.reports')}>
                                    <Button>View Reports</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Hold List</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">Manage held transactions.</p>
                                <Link href={route('admin.pos.hold-list')}>
                                    <Button>View Hold List</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">View recent sales and transactions.</p>
                                <Link href={route('admin.pos.recent-transactions')}>
                                    <Button>View Recent Transactions</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}