/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import './Header.css';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {

    const { token, setToken } = useAuth();

    const onLogOut = () => {
        setToken(null);
    }
    
    return (
        <header>
            <Link className='site-logo' to='/'>#Vanlife</Link>
            <nav>
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

                <NavLink
                    to='/vans'
                    className={({ isActive }) => isActive ? "activeLink" : ""}>
                    Vans
                </NavLink>



                {
                    token ?
                        <button onClick={onLogOut}><IoMdLogOut className="logout-icon" /></button>
                        : <NavLink
                            to='/login'>
                            <CgProfile className="login-icon" />
                        </NavLink>
                }
            </nav>
        </header>
    )
}


