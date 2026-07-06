import { Navigate } from "react-router-dom";
import { useAuth} from "../context/AuthContext";
import { Children } from "react";

export const ProtectedRoute=({children})=>{
    const {token} = useAuth();
    return token ? children:<Navigate to="/login"/>;
}