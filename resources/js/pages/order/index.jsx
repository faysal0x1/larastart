// resources/js/Pages/order/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Order() {
    const { orders, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Order',
            href: '/order',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('user_id', 'User Id', (item) => <div className="font-medium">{item.user_id}</div>),
        column('division_id', 'Division Id', (item) => <div className="font-medium">{item.division_id}</div>),
        column('district_id', 'District Id', (item) => <div className="font-medium">{item.district_id}</div>),
        column('upazilla_id', 'Upazilla Id', (item) => <div className="font-medium">{item.upazilla_id}</div>),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('email', 'Email', (item) => <div className="font-medium">{item.email}</div>),
        column('phone', 'Phone', (item) => <div className="font-medium">{item.phone}</div>),
        column('address', 'Address', (item) => <div className="font-medium">{item.address}</div>),
        column('post_code', 'Post Code', (item) => <div className="font-medium">{item.post_code}</div>),
        column('notes', 'Notes', (item) => <div className="font-medium">{item.notes}</div>),
        column('payment_type', 'Payment Type', (item) => <div className="font-medium">{item.payment_type}</div>),
        column('payment_method', 'Payment Method', (item) => <div className="font-medium">{item.payment_method}</div>),
        column('transaction_id', 'Transaction Id', (item) => <div className="font-medium">{item.transaction_id}</div>),
        column('discount', 'Discount', (item) => <div className="font-medium">{item.discount}</div>),
        column('amount', 'Amount', (item) => <div className="font-medium">{item.amount}</div>),
        column('currency', 'Currency', (item) => <div className="font-medium">{item.currency}</div>),
        column('order_number', 'Order Number', (item) => <div className="font-medium">{item.order_number}</div>),
        column('invoice_no', 'Invoice No', (item) => <div className="font-medium">{item.invoice_no}</div>),
        column('order_date', 'Order Date', (item) => <div className="font-medium">{item.order_date}</div>),
        column('confirmed_date', 'Confirmed Date', (item) => <div className="font-medium">{item.confirmed_date}</div>),
        column('processing_date', 'Processing Date', (item) => <div className="font-medium">{item.processing_date}</div>),
        column('picked_date', 'Picked Date', (item) => <div className="font-medium">{item.picked_date}</div>),
        column('shipped_date', 'Shipped Date', (item) => <div className="font-medium">{item.shipped_date}</div>),
        column('delivered_date', 'Delivered Date', (item) => <div className="font-medium">{item.delivered_date}</div>),
        column('cancel_date', 'Cancel Date', (item) => <div className="font-medium">{item.cancel_date}</div>),
        column('out_of_delivery_date', 'Out Of Delivery Date', (item) => <div className="font-medium">{item.out_of_delivery_date}</div>),
        column('return_date', 'Return Date', (item) => <div className="font-medium">{item.return_date}</div>),
        column('return_reason', 'Return Reason', (item) => <div className="font-medium">{item.return_reason}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('payment_status', 'Payment Status', (item) => <div className="font-medium">{item.payment_status}</div>),
        column('order_type', 'Order Type', (item) => <div className="font-medium">{item.order_type}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('order.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('order.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('order.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Order"
            data={orders}
            filters={filters}
            currentUser={auth.user}
            resourceName="order"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Order"
        />
    );
}
