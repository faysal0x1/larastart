import React, { useEffect, useState } from 'react';

export default function Recommendations({ context = 'product_page', productId, userId, sessionId, limit = 8, algorithm }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('context', context);
        if (productId) params.set('product_id', productId);
        if (userId) params.set('user_id', userId);
        if (sessionId) params.set('session_id', sessionId);
        if (algorithm) params.set('algorithm', algorithm);
        if (limit) params.set('limit', limit);

        fetch(`/api/recommendations?${params.toString()}`)
            .then((r) => r.json())
            .then((data) => setItems(data || []))
            .finally(() => setLoading(false));
    }, [context, productId, userId, sessionId, algorithm, limit]);

    if (loading) return <div>Loading recommendations...</div>;
    if (!items.length) return <div>No recommendations right now.</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((it) => (
                <div key={it.product_id} className="border rounded p-2">
                    <div>Product #{it.product_id}</div>
                    <div className="text-xs opacity-70">{it.reason}</div>
                    <div className="text-xs">Score: {it.score?.toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
}


