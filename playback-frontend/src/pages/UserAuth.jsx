import { useState } from "react";

const UserAuth = ({ onAuthSuccess }) => {
    const [isLoggedin, setIsLoggedin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const endpoint = isLoggedin
            ? "http://localhost:8080/auth/login"
            : "http://localhost:8080/auth/register";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Authentication failed");

            if (onAuthSuccess) onAuthSuccess();
            
            window.location.href = "/";
        } catch (err) {
            setError(err.message);
        }
    };
            
            
    return (
        <div className="auth-container">
            <h2>{isLoggedin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">{isLoggedin ? "Login" : "Register"}</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p> {isLoggedin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setIsLoggedin(!isLoggedin)} className="toggle-button"> 
                {isLoggedin ? "Register here" : "Login here"}
            </button>
            </p>
        </div>
    );
};
export default UserAuth;