import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "user_id",
    "label": "User Id",
    "type": "select",
    "required": false
},
        {
    "name": "division_id",
    "label": "Division Id",
    "type": "select",
    "required": false
},
        {
    "name": "district_id",
    "label": "District Id",
    "type": "select",
    "required": false
},
        {
    "name": "upazilla_id",
    "label": "Upazilla Id",
    "type": "select",
    "required": false
},
        {
    "name": "name",
    "label": "Name",
    "type": "text",
    "required": true
},
        {
    "name": "email",
    "label": "Email",
    "type": "email",
    "required": true
},
        {
    "name": "phone",
    "label": "Phone",
    "type": "tel",
    "required": true
},
        {
    "name": "address",
    "label": "Address",
    "type": "textarea",
    "required": true
},
        {
    "name": "post_code",
    "label": "Post Code",
    "type": "text",
    "required": true
},
        {
    "name": "notes",
    "label": "Notes",
    "type": "textarea",
    "required": true
},
        {
    "name": "payment_type",
    "label": "Payment Type",
    "type": "text",
    "required": true
},
        {
    "name": "payment_method",
    "label": "Payment Method",
    "type": "text",
    "required": true
},
        {
    "name": "transaction_id",
    "label": "Transaction Id",
    "type": "select",
    "required": false
},
        {
    "name": "discount",
    "label": "Discount",
    "type": "textarea",
    "required": true
},
        {
    "name": "amount",
    "label": "Amount",
    "type": "text",
    "required": true
},
        {
    "name": "currency",
    "label": "Currency",
    "type": "text",
    "required": true
},
        {
    "name": "order_number",
    "label": "Order Number",
    "type": "text",
    "required": true
},
        {
    "name": "invoice_no",
    "label": "Invoice No",
    "type": "text",
    "required": true
},
        {
    "name": "order_date",
    "label": "Order Date",
    "type": "date",
    "required": true
},
        {
    "name": "confirmed_date",
    "label": "Confirmed Date",
    "type": "date",
    "required": true
},
        {
    "name": "processing_date",
    "label": "Processing Date",
    "type": "date",
    "required": true
},
        {
    "name": "picked_date",
    "label": "Picked Date",
    "type": "date",
    "required": true
},
        {
    "name": "shipped_date",
    "label": "Shipped Date",
    "type": "date",
    "required": true
},
        {
    "name": "delivered_date",
    "label": "Delivered Date",
    "type": "date",
    "required": true
},
        {
    "name": "cancel_date",
    "label": "Cancel Date",
    "type": "date",
    "required": true
},
        {
    "name": "out_of_delivery_date",
    "label": "Out Of Delivery Date",
    "type": "date",
    "required": true
},
        {
    "name": "return_date",
    "label": "Return Date",
    "type": "date",
    "required": true
},
        {
    "name": "return_reason",
    "label": "Return Reason",
    "type": "text",
    "required": true
},
        {
    "name": "status",
    "label": "Status",
    "type": "select",
    "required": false
},
        {
    "name": "payment_status",
    "label": "Payment Status",
    "type": "select",
    "required": true
},
        {
    "name": "order_type",
    "label": "Order Type",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create Order',
            href: '/order'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Order" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Order"
                        description="Add a new order"
                        initialData={{
            user_id: '',
            division_id: '',
            district_id: '',
            upazilla_id: '',
            name: '',
            email: '',
            phone: '',
            address: '',
            post_code: '',
            notes: '',
            payment_type: '',
            payment_method: '',
            transaction_id: '',
            discount: '',
            amount: '',
            currency: '',
            order_number: '',
            invoice_no: '',
            order_date: '',
            confirmed_date: '',
            processing_date: '',
            picked_date: '',
            shipped_date: '',
            delivered_date: '',
            cancel_date: '',
            out_of_delivery_date: '',
            return_date: '',
            return_reason: '',
            status: '',
            payment_status: '',
            order_type: ''
                        }}
                        fields={fields}
                        submitUrl="order"
                        submitLabel="Create New Order"
                        successMessage="Order created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}