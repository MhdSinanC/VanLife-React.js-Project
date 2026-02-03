/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();



export function AuthProvider({ children }) {
    const [token, setToken] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const refreshAccessToken = async() => {
            try {
                const res = await fetch('/api/auth/refresh', {
                    credentials: 'include'
                })

                if(res.ok) {
                    const data = await res.json()
                    setToken(data.token)
                }
            }
            catch(e) {
                console.log('No valid refresh token', e);
            }
            finally {
                setLoading(false);
            }
        }
        refreshAccessToken();
    },[])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);