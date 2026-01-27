import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AuthRequired() {
    const location = useLocation();
    const {token} = useAuth();

    if (!token) {
        return <Navigate to='/login' state={{message: 'You need to login first!', from: location.pathname}} replace/>
    }

    return <Outlet />
}