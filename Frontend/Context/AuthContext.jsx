/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react";

// Create a context to share authentication state across the app
const AuthContext = createContext();


/**
 * AuthProvider
 * -------------
 * This component wraps the application and provides authentication state
 * (JWT token) to all child components using React Context.
 */
export function AuthProvider({ children }) {

    // Stores the current access token (null if not authenticated)
    const [token, setToken] = React.useState(null);

    // Tracks whether the app is still checking authentication status
    const [loading, setLoading] = React.useState(true);

    /**
     * On initial mount:
     * Attempt to refresh the access token using a refresh token (stored in cookies).
     * This keeps the user logged in even after page reload.
     */
    React.useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
                    credentials: 'include'      // Send cookies (for refresh token)
                })

                // If refresh is successful, store new access token
                if (res.ok) {
                    const data = await res.json()
                    setToken(data.token)
                }
            }
            catch (error) {
                // Happens if refresh token is invalid/expired or server is unreachable
                console.log('No valid refresh token', error);
            }
            finally {
                // Stop loading regardless of success or failure
                setLoading(false);
            }
        }
        refreshAccessToken();
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {/* Prevent rendering app until auth check is complete */}
            {!loading && children}
        </AuthContext.Provider>
    )
}

/**
 * Custom hook for accessing authentication context
 * Makes it easier to use in components (avoids repeated useContext calls)
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an Authprovider')
    };
    return context;
};