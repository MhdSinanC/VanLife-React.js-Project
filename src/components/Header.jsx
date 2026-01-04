import { Link, NavLink } from "react-router-dom";
import './Header.css';
import { CgProfile } from "react-icons/cg";

export default function Header({ isLogged, onLogOut }) {


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
                    isLogged ?
                        <button onClick={onLogOut}>Logout</button>
                        : <NavLink
                            to='/login'>
                            <CgProfile className="login-icon" />
                        </NavLink>
                }
            </nav>
        </header>
    )
}


