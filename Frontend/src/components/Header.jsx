/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import './Header.css';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";


export default function Header() {

    const { token, setToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const onLogOut = async () => {

        try {
            await fetch('/api/auth/logout', {
                method: "POST",
                credentials: 'include'
            })

        } catch (e) {
            console.log('Logout request failed', e)

        } finally {
            setToken(null)
        }
    }


    return (
        <header>
            <Link className='site-logo' to='/'>#Vanlife</Link>
            {/*Hamburger button */}
            <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? 'X' : '☰'}
            </button>
            {
                    token ?
                        <button onClick={onLogOut}><IoMdLogOut className="logout-icon" /></button>
                        : <NavLink
                            to='/login'>
                            <CgProfile className="login-icon" />
                        </NavLink>
                }
            <nav className={menuOpen ? 'nav active' : 'nav'} onClick={() => setMenuOpen(false)}>

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
        </header>
    )
}


