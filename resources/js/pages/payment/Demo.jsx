import React, { useEffect, useMemo, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Demo() {
    const { auth, cart: pageCart } = usePage().props || {};
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);

    const { data, setData, reset } = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        phone: auth?.user?.phone || '',
        address: '',
        division_id: '1', // demo default
        district_id: '1', // demo default
        upazilla_id: '',
        post_code: '',
        notes: '',
        payment_method: 'ssl_commerz',
    });

    // Cart demo state
    const [cart, setCart] = useState(pageCart);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cartLoading, setCartLoading] = useState(false);
    const [cartError, setCartError] = useState('');

    const canSubmit = useMemo(() => {
        return (
            data.name &&
            data.email &&
            data.phone &&
            data.address &&
            data.division_id &&
            data.district_id &&
            data.payment_method
        );
    }, [data]);

    const initiatePayment = async () => {
        setLoading(true);
        setPaymentStatus(null);
        setValidationErrors(null);
        try {
            const payload = {
                ...data,
                division_id: data.division_id ? Number(data.division_id) : null,
                district_id: data.district_id ? Number(data.district_id) : null,
                upazilla_id: data.upazilla_id ? Number(data.upazilla_id) : null,
            };
            const res = await axios.post('/api/payment/create-order', payload);
            console.log(res.data);
            if (res.data?.success) {
                const pd = res.data?.payment || {};
                const gatewayUrl = pd.payment_url || pd.payment_data?.GatewayPageURL || pd.payment_data?.redirectGatewayURL || pd.payment_data?.redirect_url;

                console.log(gatewayUrl);
                if (gatewayUrl) {
                    try {
                        window.location.href = gatewayUrl;
                    } catch (_) {
                        try {
                            window.location.assign(gatewayUrl);
                        } catch (__) {
                            window.open(gatewayUrl, '_self');
                        }
                    }
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
                setPaymentStatus({ type: 'error', message: 'Validation failed. Please review the fields below.', data: e?.response?.data });
            } else {
                const backendMsg = e?.response?.data?.message || e.message;
                setPaymentStatus({ type: 'error', message: backendMsg || 'Payment initiation failed', data: e?.response?.data });
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const res = await axios.get('/api/payment/history');
            if (res.data?.success) {
                setHistory(res.data.data?.data || []);
            }
        } catch (e) {
            // noop
        } finally {
            setHistoryLoading(false);
        }
    };

    const fetchCart = async () => {
        setCartLoading(true);
        setCartError('');
        try {
            const res = await axios.get('/api/cart');
            setCart(res.data);
        } catch (e) {
            setCartError(e?.response?.data?.message || e.message || 'Failed to load cart');
        } finally {
            setCartLoading(false);
        }
    };

    const addToCart = async (ev) => {
        ev.preventDefault();
        setCartLoading(true);
        setCartError('');
        try {
            const res = await axios.post('/api/cart/add', {
                product_id: Number(productId),
                quantity: Number(quantity) || 1,
            });
            setCart(res.data);
            setProductId('');
            setQuantity(1);
        } catch (e) {
            setCartError(e?.response?.data?.message || e.message || 'Add to cart failed');
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
        fetchCart();
    }, []);

    return (
        <div className="container mx-auto max-w-4xl p-6">
            <Head title="Payment Demo" />
            <h1 className="text-2xl font-semibold mb-4">Payment Demo (SSL Commerz)</h1>

            {/* Cart Demo (Module) */}
            <div className="bg-white shadow rounded p-4 mb-6">
                <h2 className="text-lg font-medium mb-3">Add To Cart (Cart Module)</h2>
                <form onSubmit={addToCart} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                        <label className="block text-xs mb-1">Product ID</label>
                        <input className="input" type="number" value={productId} onChange={e => setProductId(e.target.value)} placeholder="e.g. 1" required />
                    </div>
                    <div>
                        <label className="block text-xs mb-1">Quantity</label>
                        <input className="input" type="number" min={1} value={quantity} onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <button className="btn-primary" disabled={cartLoading} type="submit">{cartLoading ? 'Adding…' : 'Add to cart'}</button>
                </form>
                {cartError && <div className="text-red-600 text-sm mt-2">{cartError}</div>}
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">Current Cart</h3>
                        <button onClick={fetchCart} className="btn-secondary" disabled={cartLoading}>{cartLoading ? 'Refreshing…' : 'Refresh'}</button>
                    </div>
                    <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                        {JSON.stringify(cart, null, 2)}
                    </pre>
                </div>
            </div>

            {/* Checkout form */}
            <div className="bg-white shadow rounded p-4 mb-6">
                <h2 className="text-lg font-medium mb-3">Checkout</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="input" placeholder="Full name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    <input className="input" placeholder="Email" value={data.email} onChange={e => setData('email', e.target.value)} />
                    <input className="input" placeholder="Phone" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                    <input className="input" placeholder="Address" value={data.address} onChange={e => setData('address', e.target.value)} />
                    <input className="input" placeholder="Division ID (e.g., 1)" value={data.division_id} onChange={e => setData('division_id', e.target.value)} />
                    <input className="input" placeholder="District ID (e.g., 1)" value={data.district_id} onChange={e => setData('district_id', e.target.value)} />
                    <input className="input" placeholder="Upazilla ID (optional)" value={data.upazilla_id} onChange={e => setData('upazilla_id', e.target.value)} />
                    <input className="input" placeholder="Post code" value={data.post_code} onChange={e => setData('post_code', e.target.value)} />
                </div>
                <textarea className="input mt-3" rows={3} placeholder="Notes (optional)" value={data.notes} onChange={e => setData('notes', e.target.value)} />
                <div className="mt-3 flex items-center gap-3">
                    <select className="input" value={data.payment_method} onChange={e => setData('payment_method', e.target.value)}>
                        <option value="ssl_commerz">SSL Commerz</option>
                    </select>
                    <button disabled={!canSubmit || loading} onClick={initiatePayment} className="btn-primary">
                        {loading ? 'Processing…' : 'Pay Now'}
                    </button>
                </div>
                {paymentStatus && (
                    <div className={`mt-3 text-sm ${paymentStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                        {paymentStatus.message}
                    </div>
                )}
                {/* Show gateway debug if available */}
                {paymentStatus?.data?.payment?.payment_data && (
                    <pre className="bg-red-50 text-red-700 mt-2 p-3 rounded text-xs overflow-auto">
                        {JSON.stringify(paymentStatus.data.payment.payment_data, null, 2)}
                    </pre>
                )}
                {validationErrors && (
                    <ul className="mt-2 text-xs text-red-600 list-disc pl-5">
                        {Object.entries(validationErrors).map(([k, v]) => (
                            <li key={k}>{k}: {Array.isArray(v) ? v.join(', ') : String(v)}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Payment History */}
            <div className="bg-white shadow rounded p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-medium">Payment History</h2>
                    <button className="btn-secondary" onClick={fetchHistory} disabled={historyLoading}>{historyLoading ? 'Refreshing…' : 'Refresh'}</button>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-2 pr-3">Reference</th>
                                <th className="py-2 pr-3">Order</th>
                                <th className="py-2 pr-3">Amount</th>
                                <th className="py-2 pr-3">Status</th>
                                <th className="py-2 pr-3">Method</th>
                                <th className="py-2 pr-3">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length === 0 && (
                                <tr><td colSpan={6} className="py-4 text-center text-gray-500">No payments yet</td></tr>
                            )}
                            {history.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 pr-3 font-mono">{p.payment_reference}</td>
                                    <td className="py-2 pr-3">{p.order?.order_number || '-'}</td>
                                    <td className="py-2 pr-3">{p.amount} {p.currency}</td>
                                    <td className="py-2 pr-3 capitalize">{p.status}</td>
                                    <td className="py-2 pr-3 uppercase">{p.payment_method}</td>
                                    <td className="py-2 pr-3">{new Date(p.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Minimal styles */}
            <style>{`
				.input { border: 1px solid #e5e7eb; padding: 8px 10px; border-radius: 6px; width: 100%; }
				.btn-primary { background: #2563eb; color: #fff; padding: 8px 14px; border-radius: 6px; }
				.btn-secondary { background: #111827; color: #fff; padding: 8px 14px; }
			`}</style>
        </div>
    );
}
