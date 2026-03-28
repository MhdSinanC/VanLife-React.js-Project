import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


/**
 * AuthRequired
 * -------------
 * A wrapper component used to protect routes that require authentication.
 * If the user is not logged in (no token), they are redirected to the login page.
 */
export default function AuthRequired() {
    const location = useLocation();     // Get current route location
    const { token } = useAuth();        // Access authentication state

    // If user is not authenticated, redirect to login page
    if (!token) {
        return <Navigate
            to='/login'
            state={{
                message: 'You need to login first!',
                from: location.pathname     // Save the attempted route
            }}
            replace />
    }
    
    // If authenticated, render the nested protected routes
    return <Outlet />
}