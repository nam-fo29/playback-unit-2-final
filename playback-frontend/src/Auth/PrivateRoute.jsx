import { Navigate } from "react-router";
import UseAuth from "../Context/UseAuth";

export default function PrivateRoute({ children }) {
    const { token } = UseAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}