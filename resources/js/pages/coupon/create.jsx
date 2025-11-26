import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { auth, users, discountType, couponType } = usePage().props;
    const permissionOptions = auth.permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
    }));

    const couponFor = users.map((user) => ({
        label: user.name,
        value: user.id,
    }));

    const fields = [
        {
            name: 'type',
            label: 'Enter Coupon Type',
            type: 'select',
            options: couponType,
            placeholder: 'Enter Coupon type',
            required: true,
        },
        {
            name: 'title',
            label: 'Enter Coupon Title',
            type: 'text',
            placeholder: 'Enter Coupon title',
            required: true,
        },
        {
            name: 'code',
            label: 'Enter Your Code',
            type: 'text',

            placeholder: 'Enter Coupon code',
            required: true,
        },
        {
            name: 'coupon_for',
            label: 'Enter Coupon For specific user If',
            type: 'select',
            options: couponFor,
            placeholder: 'Enter Coupon coupon_for',
            required: false,
        },
        {
            name: 'limit',
            label: 'Enter Limit',
            type: 'number',
            placeholder: 'Enter Coupon limit',
            required: true,
        },
        {
            name: 'user_limit',
            label: 'Enter User Limit',
            type: 'number',
            placeholder: 'Enter Coupon user_limit',
            required: true,
        },
        {
            name: 'discount_type',
            label: 'Enter Discount Type',
            type: 'select',
            options: discountType,
            placeholder: 'Enter Coupon discount_type',
            required: true,
        },
        {
            name: 'discount',
            label: 'Enter Discount',
            type: 'number',
            placeholder: 'Enter Coupon discount',
            required: true,
        },
        {
            name: 'max_discount',
            label: 'Enter Maximum Discount',
            type: 'number',
            placeholder: 'Enter Coupon max_discount',
            required: false,
        },
        {
            name: 'minimum_purchase',
            label: 'Enter Minimum Purchase Value',
            type: 'number',
            placeholder: 'Enter Coupon minimum_purchase',
            required: false,
        },
        {
            name: 'start_at',
            label: 'Enter Starting Date',
            type: 'date',
            placeholder: 'Enter Coupon start_at',
            required: true,
        },
        {
            name: 'end_at',
            label: 'Enter End Date',
            type: 'date',
            placeholder: 'Enter Coupon end_at',
            required: false,
        },
    ];

    const sections = [
        {
            title: 'Coupon Basic Information',
            description: 'Enter the basic details of your coupon',
            fields: ['type', 'title', 'code', 'coupon_for'],
            layout: 'grid',
            gridCols: 2,
        },
        {
            title: 'Coupon Limits',
            description: 'Define the usage limits for this coupon',
            fields: ['limit', 'user_limit', 'minimum_purchase'],
            layout: 'grid',
            gridCols: 3,
        },
        {
            title: 'Discount Information',
            fields: ['discount_type', 'discount', 'max_discount'],
            layout: 'grid',
            gridCols: 3,
        },
        {
            title: 'Validity Period',
            fields: ['start_at', 'end_at'],
            layout: 'grid',
            gridCols: 2,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create Coupon',
            href: '/coupon',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Coupon" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Coupon"
                        description="Add a new coupon"
                        layoutType="sectioned"
                        sections={sections}
                        initialData={{
                            type: '',
                            title: '',
                            code: '',
                            coupon_for: '',
                            limit: '',
                            user_limit: '',
                            discount_type: '',
                            discount: '',
                            max_discount: '',
                            minimum_purchase: '',
                            start_at: '',
                            end_at: '',
                        }}
                        fields={fields}
                        submitUrl="/admin/coupon"
                        submitLabel="Create New Coupon"
                        successMessage="Coupon created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
