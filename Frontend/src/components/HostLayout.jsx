import { NavLink, Outlet } from "react-router-dom";
import './HostLayout.css';


/**
 * HostLayout
 * -----------
 * Layout component for all "host" related pages.
 * Provides a shared navigation bar and renders nested routes using <Outlet />.
 */
export default function HostLayout() {

    return (
        <>
            {/* Navigation specific to host dashboard */}
            <nav className="host-nav">
                <NavLink
                    to={'.'}
                    end         // Ensures this only matches the exact parent route
                    className={({ isActive }) => isActive ? 'active-link' : ''}>
                    Dashboard
                </NavLink>

                <NavLink
                    to={'income'}
                    className={({ isActive }) => isActive ? 'active-link' : ''}
                >
                    Income
                </NavLink>

                <NavLink
                    to={'vans'}
                    className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                    Vans
                </NavLink>

                <NavLink
                    to={'reviews'}
                    className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                    Reviews
                </NavLink>
            </nav>

            {/* Renders the matched child route */}
            <Outlet />
        </>
    )
}