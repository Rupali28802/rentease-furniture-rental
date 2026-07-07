import { Navigate } from "react-router-dom";
import { useAuth} from "../context/AuthContext";
import { Children } from "react";

export const ProtectedRoute=({children})=>{
    const {token} = useAuth();
     console.log("ProtectedRoute token:", token);
    return token ? children:<Navigate to="/login" replace/>;
}

