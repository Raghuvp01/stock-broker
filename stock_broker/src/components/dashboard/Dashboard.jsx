import { useState, useEffect } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";
import StockCard from "./StockCard";

const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

function Dashboard() {
    const [email, setEmail] = useState("");
    const [prices, setPrices] = useState({});
    const [subscriptions, setSubscriptions] = useState(() => {
        const saved = localStorage.getItem("subscriptions");
        return saved ? JSON.parse(saved) : [];
    });
    const navigate = useNavigate();
    //console.log(localStorage.getItem("subscriptions"));
    //console.log(JSON.parse(localStorage.getItem("subscriptions")));

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            navigate("/");
            return;
        }
        setEmail(storedEmail);

        subscriptions.forEach(stock => {
            socket.emit("subscribe", stock);
        });

        socket.on("priceUpdate", (data) => {
            setPrices(prev => ({ ...prev, [data.stock]: data.price }));
        });

        return () => {
            socket.off("priceUpdate");
            subscriptions.forEach(stock => socket.emit("unsubscribe", stock));
        };
    }, [navigate]);

    const toggleSubscription = (stock) => {
        let updatedSubs;
        if (subscriptions.includes(stock)) {
            socket.emit("unsubscribe", stock);
            updatedSubs = subscriptions.filter(s => s !== stock);
            setPrices(prev => {
                const newPrices = { ...prev };
                delete newPrices[stock];
                return newPrices;
            });
        } else {
            socket.emit("subscribe", stock);
            updatedSubs = [...subscriptions, stock];
        }

        setSubscriptions(updatedSubs);
        localStorage.setItem("subscriptions", JSON.stringify(updatedSubs));
    };

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("subscriptions");
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="container fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem' }}>Market Dashboard</h2>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        Logged in as: <span style={{ color: 'var(--text-primary)', marginRight: '1rem' }}>{email}</span>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>

                </div>

                <div className="row" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Available Markets</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {SUPPORTED_STOCKS.map(stock => (
                                    <button
                                        key={stock}
                                        onClick={() => toggleSubscription(stock)}
                                        className="btn"
                                        style={{
                                            justifyContent: 'space-between',
                                            background: subscriptions.includes(stock) ? 'var(--accent-color)' : 'var(--bg-secondary)',
                                            color: subscriptions.includes(stock) ? 'white' : 'var(--text-primary)',
                                            border: '1px solid var(--border-color)'
                                        }}
                                    >
                                        {stock}
                                        <span>{subscriptions.includes(stock) ? 'Subscribed' : '+ Subscribe'}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Live Portfolio</h3>
                        {subscriptions.length === 0 ? (
                            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                <p>Select stocks from the market list to view real-time data.</p>
                            </div>
                        ) : (
                            <div>
                                {subscriptions.map(stock => (
                                    <StockCard key={stock} stock={stock} price={prices[stock] || "Loading..."} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
