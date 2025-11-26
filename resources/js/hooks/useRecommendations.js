import { useEffect, useState } from 'react';

/**
 * Hook to fetch product recommendations
 * @param {Object} options - Recommendation options
 * @param {string} options.context - Context: 'home', 'product_page', 'cart', 'email', 'checkout'
 * @param {number} options.productId - Product ID for product page recommendations
 * @param {number} options.userId - User ID (if logged in)
 * @param {string} options.sessionId - Session ID (for guests)
 * @param {string} options.algorithm - Specific algorithm to use (optional)
 * @param {number} options.limit - Number of recommendations (default: 10)
 * @returns {Object} { recommendations, loading, error }
 */
export function useRecommendations({
    context = 'product_page',
    productId = null,
    userId = null,
    sessionId = null,
    algorithm = null,
    limit = 10,
}) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = new URLSearchParams();
                params.set('context', context);
                if (productId) params.set('product_id', productId);
                if (userId) params.set('user_id', userId);
                if (sessionId) params.set('session_id', sessionId);
                if (algorithm) params.set('algorithm', algorithm);
                if (limit) params.set('limit', limit);

                const response = await fetch(`/api/recommendations?${params.toString()}`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                const data = await response.json();
                setRecommendations(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                setError(err.message);
                setRecommendations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [context, productId, userId, sessionId, algorithm, limit]);

    return { recommendations, loading, error };
}

/**
 * Get session ID from cookie
 */
export function getSessionId() {
    if (typeof document === 'undefined') return null;
    const nameEQ = 'rec_session=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

