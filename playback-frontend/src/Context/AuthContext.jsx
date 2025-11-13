import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login invalid");
            }

            const data = await response.json();
            setToken(data.token);
            setUser(data.user);

            return { success: true };

        } catch (error) {
            return { success: false, message: error.message };
        }
            
        };

        const register = async (username, password) => {
            try {
                const response = await fetch("http://localhost:8080/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error("Registration failed");
                }

                return { success: true };
            } catch (error) {
                return { success: false, message: error.message };
            }
        };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    const authFetch = async (url, options = {}) => {
        const headers = options.headers ? { ...options.headers } : {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(url, { ...options, headers });
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error("Unauthorized");
        }
        return response;
    };

        return (
        <AuthContext.Provider value={{ token, user, login, register, logout, authFetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };