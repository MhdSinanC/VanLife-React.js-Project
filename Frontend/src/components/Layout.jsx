import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


/**
 * Layout
 * -------
 * Root layout component for the application.
 * Wraps all pages with a consistent structure:
 * - Header (top navigation)
 * - Main content (dynamic via Outlet)
 * - Footer
 */
export default function Layout() {

    return (
        <>
            <div className="site-wrapper">
                {/* Global header (navigation, auth controls, etc.) */}
                <Header />

                {/* Main content area where routed components are rendered */}
                <main className="site-main">
                    <Outlet />
                </main>

                {/* Global footer */}
                <Footer />
            </div>
        </>

    )
}