/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();



export function AuthProvider({ children }) {
    const [token, setToken] = React.useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);