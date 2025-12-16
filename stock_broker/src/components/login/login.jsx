import { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem("email", email);
            navigate("/dashboard");
        }
    }

    return (
        <>
            <Header />
            <div className="container fade-in" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
                <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Welcome Back</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Sign In to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;