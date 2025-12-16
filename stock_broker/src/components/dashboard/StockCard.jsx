import { useRef, useEffect } from 'react';

function StockCard({ stock, price }) {
    const prevPrice = useRef(price);
    const direction = price > prevPrice.current ? 'up' : price < prevPrice.current ? 'down' : 'neutral';

    useEffect(() => {
        prevPrice.current = price;
    }, [price]);

    const color = direction === 'up' ? 'var(--success)' : direction === 'down' ? 'var(--danger)' : 'var(--text-secondary)';

    return (
        <div className="glass-card fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stock}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Real-time Stock</span>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: color, transition: 'color 0.3s' }}>
                    ${price}
                </div>
            </div>
        </div>
    );
}

export default StockCard;
