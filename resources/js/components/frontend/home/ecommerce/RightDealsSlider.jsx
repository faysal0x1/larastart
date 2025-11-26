import React, { useEffect, useMemo, useState } from 'react';
import SingleDealPanel from './SingleDealPanel';
import axios from 'axios';

export default function RightDealsSlider() {
    const [i, setI] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('/web/random-products', { params: { limit: 5 } });
                const products = Array.isArray(res.data) ? res.data : [];
                if (products.length === 0) return;

                const mapped = products.map((p) => ({
                    title: p.name,
                    price: String(p.price ?? '0.00'),
                    original: p.originalPrice ? String(p.originalPrice) : null,
                    meta: 'Sale Ends in 21 Hours',
                    image: p.image || '/placeholder.svg'
                }));
                setSlides(mapped);
            } catch (e) {
                // keep fallback
            }
        };
        load();
    }, []);

    const slide = useMemo(() => {
        if (slides.length === 0) {
            return { title: '', price: '0.00', original: null, meta: '', items: [] };
        }
        return slides[i % slides.length];
    }, [i, slides]);
    return (
        <SingleDealPanel
            brand="Shell Shocker"
            moreLabel="See all"
            title={slide.title}
            price={slide.price}
            original={slide.original}
            image={slide.image}
            meta={slide.meta}
            logoSrc="https://upload.wikimedia.org/wikipedia/commons/5/5f/Newegg_2014_logo.png"
            onLeft={() => slides.length > 0 && setI((v) => (v - 1 + slides.length) % slides.length)}
            onRight={() => slides.length > 0 && setI((v) => (v + 1) % slides.length)}
        />
    );
}


