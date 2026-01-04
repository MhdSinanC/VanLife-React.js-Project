import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function AuthRequired() {
    const location = useLocation();
    const {isLogged} = useOutletContext();

    if (!isLogged) {
        return <Navigate to='/login' state={{message: 'You need to login first!', from: location.pathname}} replace/>
    }

    return <Outlet />
}