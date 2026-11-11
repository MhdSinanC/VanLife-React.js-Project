/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";


/**
 * Header Component
 * ----------------
 * Displays the main navigation bar.
 * Handles:
 * - Navigation links
 * - Mobile menu toggle (hamburger)
 * - Authentication actions (login/logout)
 */
export default function Header() {

    const { token, setToken } = useAuth();              // Access auth state
    const [menuOpen, setMenuOpen] = useState(false);    // Controls mobile menu visibility
    const [showProfile, setShowProfile] = useState(false); // Controls profile popup


    // Decode JWT token payload (safe Base64 decode)
    const userData = token
        ? JSON.parse(atob(token.split('.')[1]))
        : null;

    const userName = userData?.name ||
        userData?.email?.split('@')[0] || 'User';

    const userEmail = userData?.email || '';

    /**
     * Handles user logout
     * - Calls backend to clear refresh token (cookie)
     * - Clears access token from frontend state
     */
    const onLogOut = async () => {

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: 'include'      // Ensures cookies are sent
            })

        } catch (e) {
            console.log('Logout request failed', e)

        } finally {
            // Clear token regardless of API success (failsafe logout)
            setToken(null)
        }
    }


    return (
        <header className="flex items-center py-[0.7rem] px-[1.1rem] relative">
            {/* Logo / Home link */}
            <Link className='text-black font-black text-[1.5625rem] mr-auto uppercase hover:underline min-[497px]:text-[2.4rem]' to='/'>#Vanlife</Link>

            {/*Hamburger button for mobile view*/}
            <button
                className="max-[585px]:block hidden text-[26px] bg-transparent border-none cursor-pointer p-[0.3rem] mt-[2px] mr-[0.6rem]"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={'Toggle-menu'}
            >
                {menuOpen ? 'X' : '☰'}
            </button>

            {/* Navigation menu */}
            <nav
                className={`flex gap-2.5 mr-[0.2rem] items-center max-[585px]:absolute max-[585px]:top-17.5 max-[585px]:right-0 max-[585px]:bg-[#FFF7ED] max-[585px]:flex-col max-[585px]:w-full max-[585px]:p-5 max-[585px]:shadow-[0 5px 15px rgba(0,0,0,0.1)]  max-[585px]:z-1000  ${menuOpen ? 'max-[585px]:flex' : 'max-[585px]:hidden'}`}
                onClick={() => setMenuOpen(false)}      // Close menu on link click
            >

                {/* Navigation links with active styling */}
                <NavLink
                    to='/vans'
                    className={({ isActive }) =>
                        `decoration-0 text-[#4d4d4d] font-semibold p-1.25 hover:text-[#161616] hover:underline hover:decoration-2 min-[497px]:text-[1.1rem] ${isActive ? "font-bold text-[#161616] underline decoration-2" : ""}`
                    }>
                    Vans
                </NavLink>

                <NavLink
                    to='/host'
                    className={({ isActive }) =>
                        `decoration-0 text-[#4d4d4d] font-semibold p-1.25 hover:text-[#161616] hover:underline hover:decoration-2 min-[497px]:text-[1.1rem] ${isActive ? "font-bold text-[#161616] underline decoration-2" : ""}`
                    }>
                    Host
                </NavLink>

                {token && (
                    <NavLink
                        to='/bookings'
                        className={({ isActive }) =>
                            `decoration-0 text-[#4d4d4d] font-semibold p-1.25 hover:text-[#161616] hover:underline hover:decoration-2 min-[497px]:text-[1.1rem] ${isActive ? "font-bold text-[#161616] underline decoratioin-2" : ""}`
                        }>
                        My Bookings
                    </NavLink>
                )}

                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        `decoration-0 text-[#4d4d4d] font-semibold p-1.25 hover:text-[#161616] hover:underline hover:decoration-2 min-[497px]:text-[1.1rem] ${isActive ? "font-bold text-[#161616] underline decoration-2" : ""}`
                    }>
                    About
                </NavLink>

            </nav>

            {/* Auth section */}
            {token ? (
                <div className="relative">
                    {/* Profile trigger button */}
                    <button
                        onClick={() => setShowProfile(prev => !prev)}
                        className="flex items-center justify-center p-1 cursor-pointer hover:opacity-80 transition"
                        aria-label="User Profile"
                    >
                        <CgProfile className="text-2xl text-[#161616]" />
                    </button>

                    {/* Profile Popup Menu */}
                    {showProfile && (
                        <>
                            {/* Click-outside backdrop */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowProfile(false)}
                            />

                            {/* Popup Card */}
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 flex flex-col gap-3">
                                {/* User Info */}
                                <div className="flex items-center gap-3">
                                    {/* Avatar circle with initial */}
                                    <div className="w-10 h-10 rounded-full bg-[#FFEAD0] text-[#FF8C38] flex items-center justify-center font-bold text-lg shrink-0">
                                        {userName[0]?.toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-900 truncate text-sm">{userName}</p>
                                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Logout Button */}
                                <button
                                    onClick={() => {
                                        setShowProfile(false);
                                        onLogOut();
                                    }}
                                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer"
                                >
                                    <IoMdLogOut className="text-lg" />
                                    Log Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <NavLink to="/login" aria-label="login">
                    <CgProfile className="text-2xl" />
                </NavLink>
            )}
        </header>
    )
}


