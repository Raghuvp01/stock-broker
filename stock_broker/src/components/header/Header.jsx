function Header() {
    return (
        <header style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
        }}>
            <div className="container">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    Stock<span style={{ color: 'var(--accent-color)' }}>Broker</span>
                </h1>
            </div>
        </header>
    )
}

export default Header