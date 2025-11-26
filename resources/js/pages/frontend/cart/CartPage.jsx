import { useForm, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddressModal from '../../../components/cart/AddressModal';
import OrderItem from '../../../components/cart/OrderItem';
import PaymentModal from '../../../components/cart/PaymentModal';
import SideBar from '../../../components/cart/SideBar';
import TopBar from '../../../components/cart/TopBar';
import PeopleAlsoBuy from '../../../components/frontend/PeopleAlsoBuy/PeopleAlsoBuy';

const availableCoupons = [
    {
        id: 1,
        code: 'TECH10',
        value: 'Tech Store Coupon',
        discount: 10,
        type: 'percentage',
    },
    {
        id: 2,
        code: 'SAVE20',
        value: 'Save $20 Coupon',
        discount: 20,
        type: 'fixed',
    },
];

const Epcheckout2 = () => {
    const { props } = usePage();
    const { cart, addresses: serverAddresses = [], auth, flash } = props;

    // State management
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState(Array.isArray(serverAddresses) ? serverAddresses : []);
    const [selectedAddress, setSelectedAddress] = useState(
        Array.isArray(serverAddresses) && serverAddresses.length ? serverAddresses[0] : null
    );
    const [paymentMethods] = useState([
        {
            id: 1,
            type: 'mastercard',
            number: '544407******0943',
            isDefault: true,
        },
    ]);
    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
    const [appliedCoupons, setAppliedCoupons] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromoCode, setAppliedPromoCode] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paying, setPaying] = useState(false);

    // Inertia form for adding address
    const addressForm = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        post_code: '',
        division_id: '',
        district_id: '',
        upazilla_id: '',
        address: '',
    });

    // Inertia form for payment/checkout
    const checkoutForm = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        division_id: 1,
        district_id: 1,
        upazilla_id: null,
        post_code: '',
        notes: '',
        payment_method: 'ssl_commerz',
    });

    // Map cart items to orders
    const mapCartToOrders = (cartData) => {
        if (!cartData) return [];
        const items = Array.isArray(cartData.items) ? cartData.items : [];
        return items.map((it) => {
            const p = it?.product || {};
            let img = p.image_url || p.product_thumbnail || '';
            if (!img && Array.isArray(p.media) && p.media.length) {
                const first = p.media.find((m) => m?.original_url) || p.media[0];
                img = first?.original_url || '';
            }
            return {
                id: it.id,
                product_id: it.product_id,
                seller: '',
                img: img || 'https://via.placeholder.com/80x80?text=Product',
                title: p.name || `Product #${it.product_id}`,
                options: '',
                coolingDevice: '',
                category: '',
                popularity: '',
                bdPrice: Number(it.unit_price ?? p.final_price ?? p.unit_price ?? 0),
                usPrice: 0,
                shipper: '',
                shippingTime: '',
                shipping: 0,
                quantity: Number(it.quantity ?? 1),
                bestseller: false,
                isFreeGift: false,
            };
        });
    };

    // Initialize orders from cart
    useEffect(() => {
        setOrders(mapCartToOrders(cart));
    }, [cart]);

    // Update addresses from server props when available (Inertia response)
    useEffect(() => {
        const list = Array.isArray(serverAddresses) ? serverAddresses : [];
        if (list.length > 0) {
            setAddresses(list);
            if (!selectedAddress) {
                setSelectedAddress(list.find((a) => a.isDefault) || list[0]);
            }
        }
    }, [serverAddresses]);

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            alert(flash.success);
        }
        if (flash?.error) {
            alert(flash.error);
        }
    }, [flash]);

    // Calculate order summary
    const calculateOrderSummary = () => {
        const subtotal = orders.reduce((sum, item) => sum + item.bdPrice * item.quantity, 0);
        const shipping = orders.reduce((sum, item) => sum + item.shipping, 0);

        let couponDiscount = 0;
        appliedCoupons.forEach((couponId) => {
            const coupon = availableCoupons.find((c) => c.id === couponId);
            if (coupon) {
                if (coupon.type === 'percentage') {
                    couponDiscount += (subtotal * coupon.discount) / 100;
                } else {
                    couponDiscount += coupon.discount;
                }
            }
        });

        let promoDiscount = 0;
        if (appliedPromoCode) {
            promoDiscount = subtotal * 0.05;
        }

        const total = subtotal + shipping - couponDiscount - promoDiscount;

        return {
            subtotal,
            shipping,
            couponDiscount,
            promoDiscount,
            total: Math.max(0, total),
        };
    };

    const orderSummary = calculateOrderSummary();

    // Event handlers using Inertia
    const handleQuantityChange = (itemId, newQuantity) => {
        router.post(
            `/api/cart/item/${itemId}/update`,
            { quantity: newQuantity },
            {
                preserveScroll: true,
                preserveState: true,
                only: ['cart'],
                onSuccess: (page) => {
                    // Update local state with new cart data
                    if (page.props.cart) {
                        setOrders(mapCartToOrders(page.props.cart));
                    }
                },
                onError: (errors) => {
                    console.error('Error updating quantity:', errors);
                    alert(errors.message || 'Failed to update quantity');
                },
            }
        );
    };

    const handleRemoveItem = async (itemId) => {
        const result = await Swal.fire({
            title: 'Remove this item?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it',
            cancelButtonText: 'Cancel',
        });
        if (!result.isConfirmed) return;

        router.delete(`/api/cart/item/${itemId}`, {
            preserveScroll: true,
            preserveState: true,
            only: ['cart'],
            onSuccess: (page) => {
                if (page.props.cart) {
                    setOrders(mapCartToOrders(page.props.cart));
                }
                Swal.fire({ icon: 'success', title: 'Removed', text: 'Item removed from cart.' });
            },
            onError: (errors) => {
                console.error('Error removing item:', errors);
                Swal.fire({ icon: 'error', title: 'Failed', text: errors.message || 'Failed to remove item' });
            },
        });
    };

    const handleApplyCoupon = (couponId) => {
        if (!appliedCoupons.includes(couponId)) {
            setAppliedCoupons((prev) => [...prev, couponId]);
        }
    };

    const handleRemoveCoupon = (couponId) => {
        setAppliedCoupons((prev) => prev.filter((id) => id !== couponId));
    };

    const handleApplyPromoCode = () => {
        if (promoCode.trim()) {
            setAppliedPromoCode(promoCode.trim());
            setPromoCode('');
        }
    };

    const handleRemovePromoCode = () => {
        setAppliedPromoCode(null);
    };

    const handleAddAddress = (formData) => {
        // Data is already in the addressForm through the modal, just submit it
        addressForm.post('/user/addresses', {
            preserveScroll: true,
            preserveState: true,
            only: ['addresses', 'flash'],
            onSuccess: (page) => {
                setShowAddressModal(false);
                addressForm.reset();
                addressForm.clearErrors();

                const updated = page?.props?.addresses || serverAddresses;
                if (Array.isArray(updated) && updated.length) {
                    setAddresses(updated);
                    setSelectedAddress(updated.find((a) => a.isDefault) || updated[0]);
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Address added',
                    timer: 1200,
                    showConfirmButton: false
                });
            },
            onError: (errors) => {
                console.error('Error adding address:', errors);
                const errorMsg = errors?.message || Object.values(errors).flat().join(', ') || 'Failed to add address';
                Swal.fire({
                    icon: 'error',
                    title: 'Add address failed',
                    text: errorMsg
                });
            },
        });
    };

    const handleAddPayment = (newPayment) => {
        // This would use Inertia in a real implementation
        const payment = {
            id: Date.now(),
            ...newPayment,
            isDefault: paymentMethods.length === 0,
        };
        // For now, just handle locally
        alert('Payment method added (local only)');
    };

    const initiatePayment = async () => {
        if (!auth?.user) {
            const res = await Swal.fire({
                title: 'Please login first',
                text: 'You need to be logged in to place an order.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Go to Login',
                cancelButtonText: 'Cancel',
            });
            if (res.isConfirmed) {
                router.visit('/login');
            }
            return;
        }
        // Ensure an address is selected
        if (!selectedAddress) {
            await Swal.fire({
                icon: 'warning',
                title: 'Address required',
                text: 'Please add or select a delivery address before proceeding.',
            });
            return;
        }

        const fullName = (selectedAddress?.name || [selectedAddress?.first_name, selectedAddress?.last_name].filter(Boolean).join(' ') || auth?.user?.name || 'Customer').trim();
        const email = (auth?.user?.email || selectedAddress?.email || '').trim();
        const phone = (selectedAddress?.phone || auth?.user?.phone || '').toString().trim();
        const addr = (selectedAddress?.address || '').trim();

        // Prepare checkout data (build payload now to avoid async state timing issues)
        const payloadData = {
            name: selectedAddress?.name || fullName,
            email: selectedAddress?.email || email,
            phone: selectedAddress?.phone || phone,
            address: selectedAddress?.address || addr,
            division_id: selectedAddress?.division_id || 1,
            district_id: selectedAddress?.district_id || 1,
            upazilla_id: selectedAddress?.upazilla_id || null,
            post_code: selectedAddress?.post_code ? String(selectedAddress.post_code) : '',
            notes: '',
            payment_method: 'ssl_commerz',
        };
        checkoutForm.setData(payloadData);

        // Validate required fields (require at least phone and address)
        const missing = [];
        if (!phone) missing.push('phone');
        if (!addr) missing.push('address');
        if (missing.length) {
            await Swal.fire({
                icon: 'warning',
                title: 'Missing information',
                text: `Please provide ${missing.join(' and ')} before proceeding.`,
            });
            return;
        }

        // Confirm before redirecting to SSLCommerz
        const confirmPay = await Swal.fire({
            title: 'Proceed to payment?',
            text: 'You will be redirected to SSLCommerz to complete your payment.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Pay with SSLCommerz',
            cancelButtonText: 'Cancel',
        });
        if (!confirmPay.isConfirmed) return;

        try {
            setPaying(true);
            // Ensure selected address is marked active on the server before payment
            if (selectedAddress?.id) {
                await axios.patch(`/user/addresses/${selectedAddress.id}/activate`);
            }
            const res = await axios.post('/api/payment/create-order', payloadData);
            const data = res?.data;
            if (data?.success) {
                const pd = data?.payment || {};
                const gatewayUrl =
                    pd.payment_url ||
                    pd.payment_data?.GatewayPageURL ||
                    pd.payment_data?.redirectGatewayURL ||
                    pd.payment_data?.redirect_url ||
                    pd.payment_data?.data; // fallback seen in response sample

                if (gatewayUrl) {
                    window.location.href = gatewayUrl;
                } else {
                    Swal.fire({ icon: 'info', title: 'Redirect missing', text: 'Payment initiated but no redirect URL provided.' });
                }
            } else {
                Swal.fire({ icon: 'error', title: 'Payment failed', text: data?.message || 'Payment initiation failed' });
            }
        } catch (error) {
            console.error('Payment error:', error);
            const serverMsg = error?.response?.data?.message;
            Swal.fire({ icon: 'error', title: 'Error', text: serverMsg || error?.message || 'Payment initiation failed' });
        } finally {
            setPaying(false);
        }
    };

    return (
        <section className="min-h-screen bg-white py-10 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-200">Checkout</h1>
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Main Content */}
                    <div className="w-full space-y-6 lg:w-2/3">
                        {/* Address and Payment Selection */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Delivery & Payment</h2>
                            <TopBar
                                addresses={addresses}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                                showAddressModal={showAddressModal}
                                setShowAddressModal={setShowAddressModal}
                                paymentMethods={paymentMethods}
                                selectedPayment={selectedPayment}
                                setSelectedPayment={setSelectedPayment}
                                showPaymentModal={showPaymentModal}
                                setShowPaymentModal={setShowPaymentModal}
                            />
                        </div>

                        {/* Order Review */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Your Cart</h2>
                            {orders.length === 0 ? (
                                <p className="py-4 text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                            ) : (
                                orders.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center border-b border-gray-200 py-4 last:border-b-0 dark:border-gray-700"
                                    >
                                        <div className="flex-1">
                                            <OrderItem item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* People Also Buy Section */}
                        {orders.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">People Also Buy</h2>
                                </div>
                                <PeopleAlsoBuy cartProductIds={orders.map(item => item.product_id).filter(Boolean)} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar for Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Order Summary</h2>
                            <SideBar
                                coupons={availableCoupons}
                                appliedCoupons={appliedCoupons}
                                onApplyCoupon={handleApplyCoupon}
                                onRemoveCoupon={handleRemoveCoupon}
                                promoCode={promoCode}
                                setPromoCode={setPromoCode}
                                onApplyPromoCode={handleApplyPromoCode}
                                appliedPromoCode={appliedPromoCode}
                                onRemovePromoCode={handleRemovePromoCode}
                                orderSummary={orderSummary}
                                onPlaceOrder={initiatePayment}
                                placeOrderLoading={paying}
                                paymentStatus={
                                    checkoutForm.hasErrors
                                        ? { type: 'error', message: 'Please review your details.' }
                                        : null
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            <AddressModal
                isOpen={showAddressModal}
                onClose={() => {
                    setShowAddressModal(false);
                    addressForm.reset();
                    addressForm.clearErrors();
                }}
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                onAddAddress={handleAddAddress}
                processing={addressForm.processing}
                errors={addressForm.errors}
                formData={addressForm.data}
                setFormData={addressForm.setData}
            />

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                onAddPayment={handleAddPayment}
            />
        </section>
    );
};

export default Epcheckout2;
