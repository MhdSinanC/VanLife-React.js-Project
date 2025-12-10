import { Link, NavLink } from "react-router-dom";
import './Header.css';

export default function Header() {
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
            </nav>
        </header>
    )
}


