import React, { useEffect, useState } from 'react';
import ComboPanel from './ComboPanel';
import axios from 'axios';

export default function CenterDealStatic() {
    const [items, setItems] = useState([])
    const [price, setPrice] = useState('0.00')
    const [original, setOriginal] = useState(null)
    const [meta, setMeta] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('/web/random-products', { params: { limit: 3 } })
                const products = Array.isArray(res.data) ? res.data : []
                if (products.length > 0) {
                    setItems(products.map(p => ({ title: p.name, image: p.image || '/placeholder.svg' })))
                    setPrice(String(products[0]?.price ?? '0.00'))
                    setOriginal(products[0]?.originalPrice ? String(products[0].originalPrice) : null)
                    setMeta('Limited time combo')
                }
            } catch (e) {
                // keep fallback
            }
        }
        load()
    }, [])

    return (
        <ComboPanel
            brand="NAS"
            moreLabel="More options"
            savingsLabel={meta}
            items={items}
            price={price}
            original={original}
            ctaLeft="Build with it"
            ctaRight="Add to cart"
        />
    );
}


