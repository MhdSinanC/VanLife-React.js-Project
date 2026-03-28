import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import './Dashboard.css'
import { apiFetch } from "../../../utils/apiFetch";
import { useAuth } from "../../../Context/AuthContext";


/**
 * Dashboard
 * ----------
 * Host dashboard displaying:
 * - Earnings summary
 * - Review score
 * - List of host's vans
 */
export default function Dashboard() {

    const [vans, setVans] = useState([]);               // Stores fetched vans
    const [loading, setLoading] = useState(false);      // Tracks loading state
    const [error, setError] = useState(null);           // Stores error message (if any)

    const { token, setToken } = useAuth();              // Auth context (for protected API calls)


    /**
     * Fetch host vans on component mount and refetch when token updates
     */
    useEffect(() => {
        const loadVans = async () => {
            try {
                setLoading(true)
                // Custom fetch utility (handles auth + token refresh)
                const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, token, setToken)
                const data = await res.json()
                // Ensure safe fallback if response is empty
                setVans(data || []);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }
        }

        if (!token) return;     // wait until token exists
        loadVans();

    }, [token])

    /**
     * Renders list of vans
     */
    function renderVanElements(vans) {
        const hostVanEls = vans.map(van => (

            <div key={van._id} className="host-van-card" style={{ maxHeight: 'none' }}>
                <img src={van.imageUrl} alt={van.name} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>{`$${van.price}/day`}</p>
                </div>
                <Link className="dashboard-link-button ml-auto" to={`vans/${van._id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-vans-list-container">
                {hostVanEls}
            </div>
        )
    }

    // Error state UI
    if (error) {
        return <h1>Error: {error}</h1>
    }



    return (
        <>
            {/* Earnings section */}
            <section className="host-dashboard-earnings">
                <div className="earnings-info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,890</h2>
                </div>
                <Link className="dashboard-link-button" to={'income'}>Details</Link>
            </section>

            {/* Reviews section */}
            <section className="host-dashboard-reviews">
                <div className="reviews-info">
                    <h2>Review score</h2>
                    <BsStarFill className="star" />
                    <p>
                        <span>5.0</span>/5
                    </p>
                </div>
                <Link className="dashboard-link-button" to={'reviews'}>Details</Link>
            </section>

            {/* Vans listing section */}
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    {vans.length > 0 && <Link className="dashboard-link-button" to='vans'>View all</Link>}
                </div>

                <div className="main">
                    {loading ?
                        <h3>Loading..</h3>
                        : vans.length === 0 ?
                            <h3>No vans found</h3>
                            : renderVanElements(vans)}
                </div>

            </section>

        </>
    )
}