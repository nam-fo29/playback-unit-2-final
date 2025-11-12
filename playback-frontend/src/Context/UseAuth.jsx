import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function UseAuth() {
    return useContext(AuthContext);
}