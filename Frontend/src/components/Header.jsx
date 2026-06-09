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
                className="max-[500px]:block hidden text-[26px] bg-transparent border-none cursor-pointer p-[0.3rem]"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={'Toggle-menu'}
            >
                {menuOpen ? 'X' : '☰'}
            </button>

            {/* Navigation menu */}
            <nav
                className={`flex gap-2.5 mr-[0.2rem] items-center max-[500px]:absolute max-[500px]:top-17.5 max-[500px]:right-0 max-[500px]:bg-[#FFF7ED] max-[500px]:flex-col max-[500px]:w-full max-[500px]:p-5 max-[500px]:shadow-[0 5px 15px rgba(0,0,0,0.1)]  max-[500px]:z-1000  ${menuOpen ? 'max-[500px]:flex' : 'max-[500px]:hidden'}`}
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

                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        `decoration-0 text-[#4d4d4d] font-semibold p-1.25 hover:text-[#161616] hover:underline hover:decoration-2 min-[497px]:text-[1.1rem] ${isActive ? "font-bold text-[#161616] underline decoration-2" : ""}`
                    }>
                    About
                </NavLink>

            </nav>

            {/* Auth section: show logout if logged in, else login icon */}
            {
                token ?
                    <button onClick={onLogOut}><IoMdLogOut className="text-2xl" /></button>
                    : <NavLink
                        to='/login'>
                        <CgProfile className="text-2xl" />
                    </NavLink>
            }
        </header>
    )
}


