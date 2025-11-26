'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CheckCircle, Clock, Download, Eye, Filter, MessageSquare, Package, RefreshCw, Search, Star, Truck, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [statistics, setStatistics] = useState({
        total_orders: 0,
        delivered: 0,
        shipped: 0,
        processing: 0,
        cancelled: 0,
        pending: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    });

    // Fetch orders from API
    const fetchOrders = async (page = 1, status = 'all', search = '') => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                status: status,
                search: search,
            });

            const response = await axios.get(`/api/user/orders?${params}`);

            if (response.data.success) {
                setOrders(response.data.data.orders);
                setPagination(response.data.data.pagination);
            } else {
                setError(response.data.message || 'Failed to fetch orders');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch order statistics
    const fetchStatistics = async () => {
        try {
            const response = await axios.get('/api/user/orders/statistics');
            if (response.data.success) {
                setStatistics(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching statistics:', err);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchOrders();
        fetchStatistics();
    }, []);

    // Refetch when filters change
    useEffect(() => {
        fetchOrders(1, filterStatus, searchTerm);
    }, [filterStatus, searchTerm]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4" />;
            case 'shipped':
                return <Truck className="h-4 w-4" />;
            case 'processing':
                return <Clock className="h-4 w-4" />;
            case 'canceled':
                return <XCircle className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'confirmed':
                return <Clock className="h-4 w-4" />;
            case 'out_for_delivery':
                return <Truck className="h-4 w-4" />;
            case 'returned':
                return <XCircle className="h-4 w-4" />;
            case 'failed':
                return <XCircle className="h-4 w-4" />;
            default:
                return <Package className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'shipped':
            case 'out_for_delivery':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'processing':
            case 'confirmed':
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'canceled':
            case 'returned':
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusDisplayName = (status) => {
        switch (status) {
            case 'out_for_delivery':
                return 'Out for Delivery';
            case 'canceled':
                return 'Cancelled';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    const handleTrackOrder = (trackingNumber) => {
        console.log('Tracking order:', trackingNumber);
        // Here you would typically redirect to tracking page or open tracking modal
        // For now, just show an alert
        alert(`Tracking number: ${trackingNumber}\n\nThis would typically open a tracking page or modal.`);
    };

    const handleReorder = (orderId) => {
        console.log('Reordering:', orderId);
        // Here you would typically add items to cart and redirect to checkout
        // For now, just show an alert
        alert(`Reordering order ${orderId}\n\nThis would add all items from this order to your cart.`);
    };

    const handleDownloadInvoice = (orderId) => {
        console.log('Downloading invoice for:', orderId);
        // Here you would typically generate and download PDF invoice
        // For now, just show an alert
        alert(`Downloading invoice for order ${orderId}\n\nThis would generate and download a PDF invoice.`);
    };

    const handleWriteReview = (productId, productName) => {
        console.log('Writing review for product:', productId, productName);
        // Here you would typically open review modal or redirect to review page
        // For now, just show an alert
        alert(`Writing review for: ${productName}\n\nThis would open a review form.`);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.post(`/api/user/orders/${orderId}/cancel`);
            if (response.data.success) {
                alert('Order cancelled successfully');
                // Refresh orders
                fetchOrders(pagination.current_page, filterStatus, searchTerm);
            } else {
                alert(response.data.message || 'Failed to cancel order');
            }
        } catch (err) {
            console.error('Error cancelling order:', err);
            alert('Failed to cancel order. Please try again.');
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsOrderModalOpen(false);
        setSelectedOrder(null);
    };

    const handleRefresh = () => {
        fetchOrders(pagination.current_page, filterStatus, searchTerm);
        fetchStatistics();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <Card className="border-0 bg-white text-black shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-black">Order History</CardTitle>
                            <CardDescription>Track and manage your orders</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Search and Filter */}
            <Card className="border-0 bg-white text-black shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search orders or products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border-input focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                            >
                                <option value="all">All Orders</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Orders</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{statistics.total_orders}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        All
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-500 p-3">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Delivered</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{statistics.delivered}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        {statistics.total_orders > 0 ? Math.round((statistics.delivered / statistics.total_orders) * 100) : 0}%
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-500 p-3">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">In Transit</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{statistics.shipped}</p>
                                    <Badge variant="secondary" className="bg-blue-100 text-xs text-blue-700">
                                        Shipped
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-600 p-3">
                                <Truck className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Processing</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{statistics.processing + statistics.pending}</p>
                                    <Badge variant="secondary" className="bg-yellow-100 text-xs text-yellow-700">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-yellow-500 p-3">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Loading State */}
            {loading && (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-black">Loading orders...</h3>
                            <p className="text-black">Please wait while we fetch your orders</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Error State */}
            {error && !loading && (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
                            <h3 className="mb-2 text-lg font-medium text-black">Error loading orders</h3>
                            <p className="mb-4 text-black">{error}</p>
                            <Button onClick={handleRefresh} variant="outline">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Orders List */}
            {!loading && !error && (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="border-0 bg-white shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <CardTitle className="text-lg text-black">{order.order_number}</CardTitle>
                                            <CardDescription>
                                                Ordered on{' '}
                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </CardDescription>
                                        </div>
                                        <Badge className={getStatusColor(order.status)}>
                                            {getStatusIcon(order.status)}
                                            <span className="ml-1">{getStatusDisplayName(order.status)}</span>
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-black">
                                            BDT {order.total.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-black">{order.items} items</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Products */}
                                <div className="mb-4 space-y-3">
                                    {order.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center gap-4 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                                        >
                                            <Avatar className="h-12 w-12 rounded-md">
                                                <AvatarImage src={product.image || '/placeholder.svg'} alt={product.name} />
                                                <AvatarFallback className="rounded-md">
                                                    <Package className="h-6 w-6" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-black">{product.name}</h4>
                                                <p className="text-sm text-black">
                                                    Quantity: {product.quantity} • BDT {product.price.toFixed(2)}
                                                </p>
                                                {product.color && (
                                                    <p className="text-xs text-gray-500">Color: {product.color}</p>
                                                )}
                                                {product.size && (
                                                    <p className="text-xs text-gray-500">Size: {product.size}</p>
                                                )}
                                            </div>
                                            {order.status === 'delivered' && (
                                                <div className="flex items-center gap-2 text-black">
                                                    {product.reviewed ? (
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(product.rating)].map((_, i) => (
                                                                <Star key={i} className="fill-primary text-primary h-4 w-4" />
                                                            ))}
                                                            <span className="ml-1 text-sm text-black">Reviewed</span>
                                                        </div>
                                                    ) : (
                                                        <Button size="sm" variant="outline" onClick={() => handleWriteReview(product.id, product.name)}>
                                                            <MessageSquare className="mr-1 h-4 w-4 text-black" />
                                                            Review
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Tracking Info */}
                                {order.tracking_number && (
                                    <div className="mb-4 rounded-lg bg-blue-50 p-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-black">Tracking Number: {order.tracking_number}</p>
                                                <p className="text-sm text-black">
                                                    {order.status === 'delivered'
                                                        ? `Delivered on ${new Date(order.actual_delivery).toLocaleDateString()}`
                                                        : `Estimated delivery: ${new Date(order.estimated_delivery).toLocaleDateString()}`}
                                                </p>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="text-black"
                                                variant="outline"
                                                onClick={() => handleTrackOrder(order.tracking_number)}
                                            >
                                                <Truck className="mr-1 h-4 w-4 text-black" />
                                                Track
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 border-t pt-4">
                                    <Button size="sm" className="text-black" variant="outline" onClick={() => handleDownloadInvoice(order.id)}>
                                        <Download className="mr-1 h-4 w-4 text-black" />
                                        Invoice
                                    </Button>
                                    <Button size="sm" className="text-black" variant="outline" onClick={() => handleViewDetails(order)}>
                                        <Eye className="mr-1 h-4 w-4 text-black" />
                                        View Details
                                    </Button>
                                    {order.status === 'delivered' && (
                                        <Button size="sm" className="bg-sky-900 text-white" onClick={() => handleReorder(order.id)}>
                                            <RefreshCw className="mr-1 h-4 w-4" />
                                            Reorder
                                        </Button>
                                    )}
                                    {(order.status === 'processing' || order.status === 'pending') && (
                                        <Button size="sm" variant="destructive" onClick={() => handleCancelOrder(order.id)}>
                                            <XCircle className="mr-1 h-4 w-4 text-black" />
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {orders.length === 0 && (
                        <Card className="border-0 bg-white shadow-sm">
                            <CardContent className="pt-6">
                                <div className="py-8 text-center">
                                    <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-black">No orders found</h3>
                                    <p className="text-black">
                                        {searchTerm || filterStatus !== 'all'
                                            ? 'Try adjusting your search or filter criteria'
                                            : "You haven't placed any orders yet"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Order Details Modal */}
            <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                <DialogContent className="max-h-[88vh] min-w-[800px]">
                    {selectedOrder && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-black">Order Details - {selectedOrder.order_number}</DialogTitle>
                                <DialogDescription className="text-black">Complete information about your order</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Order Summary */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <Card className="border-0 bg-gray-50">
                                        <CardContent className="p-4">
                                            <h3 className="mb-3 font-semibold text-black">Order Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Order ID:</span>
                                                    <span className="font-medium text-black">{selectedOrder.order_number}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Order Date:</span>
                                                    <span className="font-medium text-black">
                                                        {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Status:</span>
                                                    <Badge className={getStatusColor(selectedOrder.status)}>
                                                        {getStatusIcon(selectedOrder.status)}
                                                        <span className="ml-1">{getStatusDisplayName(selectedOrder.status)}</span>
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Items:</span>
                                                    <span className="font-medium text-black">{selectedOrder.items}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Amount:</span>
                                                    <span className="text-lg font-bold text-black">BDT {selectedOrder.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Shipping Information */}
                                    <Card className="border-0 bg-gray-50">
                                        <CardContent className="p-4">
                                            <h3 className="mb-3 font-semibold text-black">Shipping Information</h3>
                                            <div className="space-y-2 text-sm">
                                                {selectedOrder.tracking_number ? (
                                                    <>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Tracking Number:</span>
                                                            <span className="font-medium text-black">{selectedOrder.tracking_number}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">
                                                                {selectedOrder.status === 'delivered' ? 'Delivered:' : 'Estimated Delivery:'}
                                                            </span>
                                                            <span className="font-medium text-black">
                                                                {selectedOrder.status === 'delivered'
                                                                    ? new Date(selectedOrder.actual_delivery).toLocaleDateString()
                                                                    : new Date(selectedOrder.estimated_delivery).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="py-4 text-center">
                                                        <Clock className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                        <p className="text-gray-600">Tracking information not available yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Products List */}
                                <Card className="border-0 bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-black">Order Items</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {selectedOrder.products.map((product, index) => (
                                                <div
                                                    key={product.id}
                                                    className={`flex items-center gap-4 rounded-lg p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                        }`}
                                                >
                                                    <Avatar className="h-16 w-16 rounded-md">
                                                        <AvatarImage src={product.image } alt={product.name} />
                                                        <AvatarFallback className="rounded-md">
                                                            <Package className="h-8 w-8" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-black">{product.name}</h4>
                                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                                            <span>Quantity: {product.quantity}</span>
                                                            <span>Price: BDT {product.price.toFixed(2)}</span>
                                                            <span className="font-semibold text-black">
                                                                Total: BDT {product.total_price.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {selectedOrder.status === 'delivered' && (
                                                        <div className="text-right">
                                                            {product.reviewed ? (
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(product.rating)].map((_, i) => (
                                                                        <Star key={i} className="fill-primary text-primary h-4 w-4" />
                                                                    ))}
                                                                    <span className="ml-1 text-sm text-green-600">Reviewed</span>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleWriteReview(product.id, product.name)}
                                                                >
                                                                    <MessageSquare className="mr-1 h-4 w-4" />
                                                                    Write Review
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Order Actions */}
                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" onClick={() => handleDownloadInvoice(selectedOrder.id)}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Invoice
                                        </Button>
                                        {selectedOrder.tracking_number && (
                                            <Button variant="outline" onClick={() => handleTrackOrder(selectedOrder.tracking_number)}>
                                                <Truck className="mr-2 h-4 w-4" />
                                                Track Order
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedOrder.status === 'delivered' && (
                                            <Button className="bg-sky-900 text-white" onClick={() => handleReorder(selectedOrder.id)}>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Reorder
                                            </Button>
                                        )}
                                        {(selectedOrder.status === 'processing' || selectedOrder.status === 'pending') && (
                                            <Button variant="destructive" onClick={() => handleCancelOrder(selectedOrder.id)}>
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Cancel Order
                                            </Button>
                                        )}
                                        <Button variant="outline" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
