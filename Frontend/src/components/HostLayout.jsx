import { NavLink, Outlet } from "react-router-dom";


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
            <nav className="p-4 flex gap-6 overflow-x-auto whitespace-nowrap">
                <NavLink
                    to={'.'}
                    end         // Ensures this only matches the exact parent route
                    className={({ isActive }) => `no-underline text-[18px] text-[#4D4D4D] leading-5.5 hover:text-[#161616] hover:underline ${isActive ? 'font-bold underline text-[#161616]' : ''}`}
                    >
                    Dashboard
                </NavLink>

                <NavLink
                    to={'income'}
                    className={({ isActive }) => `no-underline text-[18px] text-[#4D4D4D] leading-5.5 hover:text-[#161616] hover:underline ${isActive ? 'font-bold underline text-[#161616]' : ''}`}
                >
                    Income
                </NavLink>

                <NavLink
                    to={'vans'}
                    className={({ isActive }) => `no-underline text-[18px] text-[#4D4D4D] leading-5.5 hover:text-[#161616] hover:underline ${isActive ? 'font-bold underline text-[#161616]' : ''}`}
                    >
                    Vans
                </NavLink>

                <NavLink
                    to={'reviews'}
                    className={({ isActive }) => `no-underline text-[18px] text-[#4D4D4D] leading-5.5 hover:text-[#161616] hover:underline ${isActive ? 'font-bold underline text-[#161616]' : ''}`}
                    >
                    Reviews
                </NavLink>
            </nav>

            {/* Renders the matched child route */}
            <Outlet />
        </>
    )
}