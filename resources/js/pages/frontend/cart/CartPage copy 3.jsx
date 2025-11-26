import  { useState, useEffect } from "react";
import { usePage } from '@inertiajs/react';
import TopBar from '../../../components/cart/TopBar';
import AddressModal from '../../../components/cart/AddressModal';
import PaymentModal from '../../../components/cart/PaymentModal';
import SideBar from '../../../components/cart/SideBar';
import OrderItem from '../../../components/cart/OrderItem';
import axios from 'axios';

// Initial data (will be replaced by Inertia prop `cart`)
const initialOrders = [];

const availableCoupons = [
    {
        id: 1,
        code: "TECH10",
        value: "Tech Store Coupon",
        discount: 10, // 10% discount
        type: "percentage"
    },
    {
        id: 2,
        code: "SAVE20",
        value: "Save $20 Coupon",
        discount: 20, // $20 discount
        type: "fixed"
    },
];

const initialAddresses = [];

const initialPaymentMethods = [
    {
        id: 1,
        type: "mastercard",
        number: "544407******0943",
        isDefault: true
    }
];

const Epcheckout2 = () => {
    const { props } = usePage();
    const cart = props?.cart;
    const { auth } = props || {};
    // State management
    const [orders, setOrders] = useState(initialOrders);
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0]);
    const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
    const [selectedPayment, setSelectedPayment] = useState(initialPaymentMethods[0]);
    const [appliedCoupons, setAppliedCoupons] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromoCode, setAppliedPromoCode] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [validationErrors, setValidationErrors] = useState(null);

    // Load user addresses on mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get('/user/addresses');
                const list = res?.data?.data || [];
                setAddresses(list);
                if (!selectedAddress && list.length > 0) {
                    setSelectedAddress(list[0]);
                }
            } catch (e) {
                // ignore
            }
        };
        fetchAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Calculate order summary
    const calculateOrderSummary = () => {
        const subtotal = orders.reduce((sum, item) => sum + (item.bdPrice * item.quantity), 0);
        const shipping = orders.reduce((sum, item) => sum + item.shipping, 0);

        // Calculate coupon discounts
        let couponDiscount = 0;
        appliedCoupons.forEach(couponId => {
            const coupon = availableCoupons.find(c => c.id === couponId);
            if (coupon) {
                if (coupon.type === "percentage") {
                    couponDiscount += (subtotal * coupon.discount) / 100;
                } else {
                    couponDiscount += coupon.discount;
                }
            }
        });

        // Calculate promo code discount
        let promoDiscount = 0;
        if (appliedPromoCode) {
            // Simple promo code logic - 5% discount
            promoDiscount = subtotal * 0.05;
        }

        const total = subtotal + shipping - couponDiscount - promoDiscount;
        const totalBDT = total * 75; // Assuming 1 USD = 75 BDT

        return {
            subtotal,
            shipping,
            couponDiscount,
            promoDiscount,
            total: Math.max(0, total),
            totalBDT
        };
    };

    const orderSummary = calculateOrderSummary();

    // Map Inertia cart prop to orders on mount/prop change
    useEffect(() => {
        if (!cart) return;
        const items = Array.isArray(cart.items) ? cart.items : [];
        const mapped = items.map((it) => {
            const p = it?.product || {};
            let img = p.image_url || p.product_thumbnail || '';
            if (!img && Array.isArray(p.media) && p.media.length) {
                const first = p.media.find(m => m?.original_url) || p.media[0];
                img = first?.original_url || '';
            }
            return {
                id: it.id,
                product_id: it.product_id,
                seller: '',
                img: img || 'https://via.placeholder.com/400x300?text=Product',
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
        setOrders(mapped);
    }, [cart]);

    // Event handlers
    const handleQuantityChange = (itemId, newQuantity) => {
        setOrders(prevOrders =>
            prevOrders.map(item =>
                item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        );
    };

    const handleRemoveItem = (itemId) => {
        setOrders(prevOrders => prevOrders.filter(item => item.id !== itemId));
    };

    const handleApplyCoupon = (couponId) => {
        if (!appliedCoupons.includes(couponId)) {
            setAppliedCoupons(prev => [...prev, couponId]);
        }
    };

    const handleRemoveCoupon = (couponId) => {
        setAppliedCoupons(prev => prev.filter(id => id !== couponId));
    };

    const handleApplyPromoCode = () => {
        if (promoCode.trim()) {
            setAppliedPromoCode(promoCode.trim());
            setPromoCode("");
        }
    };

    const handleRemovePromoCode = () => {
        setAppliedPromoCode(null);
    };

    const handleAddAddress = async (newAddress) => {
        try {
            const payload = {
                first_name: newAddress.first_name,
                last_name: newAddress.last_name,
                phone: newAddress.phone,
                email: newAddress.email,
                post_code: newAddress.post_code ? Number(newAddress.post_code) : undefined,
                division_id: newAddress.division_id ? Number(newAddress.division_id) : undefined,
                district_id: newAddress.district_id ? Number(newAddress.district_id) : undefined,
                upazilla_id: newAddress.upazilla_id ? Number(newAddress.upazilla_id) : undefined,
                address: newAddress.address,
            };
            const res = await axios.post('/user/addresses', payload);
            const created = res?.data?.data;
            if (created) {
                setAddresses(prev => [created, ...prev]);
                if (!selectedAddress) {
                    setSelectedAddress(created);
                }
            }
        } catch (e) {
            // Optionally surface error
        }
    };

    const handleAddPayment = (newPayment) => {
        const payment = {
            id: Date.now(),
            ...newPayment,
            isDefault: paymentMethods.length === 0
        };
        setPaymentMethods(prev => [...prev, payment]);
        if (paymentMethods.length === 0) {
            setSelectedPayment(payment);
        }
    };

    const initiatePayment = async () => {
        setPlaceOrderLoading(true);
        setPaymentStatus(null);
        setValidationErrors(null);
        try {
            const payload = {
                name: selectedAddress?.name || auth?.user?.name || '',
                email: auth?.user?.email || '',
                phone: selectedAddress?.phone || auth?.user?.phone || '',
                address: [selectedAddress?.address, selectedAddress?.city].filter(Boolean).join(', '),
                division_id: 1,
                district_id: 1,
                upazilla_id: null,
                post_code: '',
                notes: '',
                payment_method: 'ssl_commerz',
            };

            if (!payload.name || !payload.email || !payload.phone || !payload.address) {
                setPaymentStatus({ type: 'error', message: 'Please provide name, email, phone and address before proceeding.' });
                return;
            }

            const res = await axios.post('/api/payment/create-order', payload);
            if (res.data?.success) {
                const pd = res.data?.payment || {};
                const gatewayUrl = pd.payment_url || pd.payment_data?.GatewayPageURL || pd.payment_data?.redirectGatewayURL || pd.payment_data?.redirect_url;
                if (gatewayUrl) {
                    try { window.location.href = gatewayUrl; }
                    catch (_) { try { window.location.assign(gatewayUrl); } catch (__) { window.open(gatewayUrl, '_self'); } }
                    return;
                }
                const gatewayMessage = pd.payment_data?.message || pd.payment_data?.status || 'No redirect URL from gateway';
                setPaymentStatus({ type: 'error', message: `Payment initiated but no redirect URL provided: ${gatewayMessage}`, data: res.data });
            } else {
                const message = res.data?.message || 'Payment initiation failed';
                setPaymentStatus({ type: 'error', message, data: res.data });
            }
        } catch (e) {
            if (e?.response?.status === 422) {
                setValidationErrors(e.response.data?.errors || { _error: e.response.data?.message });
                setPaymentStatus({ type: 'error', message: 'Validation failed. Please review your details.', data: e?.response?.data });
            } else {
                const backendMsg = e?.response?.data?.message || e.message;
                setPaymentStatus({ type: 'error', message: backendMsg || 'Payment initiation failed', data: e?.response?.data });
            }
        } finally {
            setPlaceOrderLoading(false);
        }
    };

    return (
        <section className="py-14 md:py-24 bg-gray-100 dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 justify-center">
                    <div className="w-full lg:w-2/3">
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
                        <div className="bg-white dark:bg-slate-800  p-4 md:p-6 mb-4">
                            <h6 className="fs-6 fw-bold mb-0">Order Review</h6>
                            {orders.map((item) => (
                                <>
                                    <hr className=" border border-gray-100 mt-4" />
                                    <OrderItem
                                        item={item}
                                        key={item.id}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemoveItem}
                                    />
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4">
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
                            placeOrderLoading={placeOrderLoading}
                            paymentStatus={paymentStatus}
                        />
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            <AddressModal
                isOpen={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                onAddAddress={handleAddAddress}
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
