import { useContext, useState } from "react";
import { register, login, fetchLists } from "../api.js";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function Account({ setLists }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        setLists({
            rewind: { movie: [], tv: [], game: [], book: [] },
            upNext: { movie: [], tv: [], game: [], book: [] }
        })
        setSuccess("Logged out")
        setUsername("");
        setPassword("");
        localStorage.removeItem("token");
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const result = isLogin
            ? await login(username, password)
            : await register(username, password);

            if (result?.success === false) {
                setError(result.message);
            } else {
                setSuccess(isLogin ? "Login successful!" : "Registration successful! You can now log in.");
                if (isLogin) window.location.href = "/";
                const userLists = await fetchLists();
                console.log("User lists: ", userLists);
            }
    };

    return (
        <div className="account-form">
            <h2 className="account-title">{isLogin ? "Login" : "Register"}</h2>
            <form className="login-register" onSubmit={handleSubmit}>
                <input
                className="user-username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                className="user-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="login-reg-button" type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button className="switch-log-reg" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Register here" : "Login here"}
                </button>
            </p>
            {isLogin && (
                <button onClick={handleLogout} className="logout-button"
            >Logout</button>
            )}
        </div>
    );
}