/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import './Header.css';
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
        <header>
            {/* Logo / Home link */}
            <Link className='site-logo' to='/'>#Vanlife</Link>

            {/*Hamburger button for mobile view*/}
            <button
                className="menu-btn"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={'Toggle-menu'}
            >
                {menuOpen ? 'X' : '☰'}
            </button>

            {/* Navigation menu */}
            <nav
                className={menuOpen ? 'nav active' : 'nav'}
                onClick={() => setMenuOpen(false)}      // Close menu on link click
            >

                {/* Navigation links with active styling */}
                <NavLink
                    to='/vans'
                    className={({ isActive }) => isActive ? "activeLink" : ""}>
                    Vans
                </NavLink>

                <NavLink
                    to='/host'
                    className={({ isActive }) => isActive ? "activeLink" : ""}>
                    Host
                </NavLink>

                <NavLink
                    to='/about'
                    className={({ isActive }) => isActive ? "activeLink" : ""}>
                    About
                </NavLink>

            </nav>

            {/* Auth section: show logout if logged in, else login icon */}
            {
                token ?
                    <button onClick={onLogOut}><IoMdLogOut className="logout-icon" /></button>
                    : <NavLink
                        to='/login'>
                        <CgProfile className="login-icon" />
                    </NavLink>
            }
        </header>
    )
}


