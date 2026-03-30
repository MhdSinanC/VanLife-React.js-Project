import { useState, useEffect } from 'react';
import './HostVans.css';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../utils/apiFetch';
import { useAuth } from '../../../Context/AuthContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

/**
 * HostVans
 * ----------
 * Displays all vans listed by the host.
 * Features:
 * - Fetch vans from API
 * - Show loading and error states
 * - Navigate to individual van details
 * - Provide option to add a new van
 */
export default function HostVans() {

    const [vans, setVans] = useState([]);         // Stores host vans
    const [error, setError] = useState(null);     // Error state
    const [loading, setLoading] = useState(true); // Loading state

    const { token, setToken } = useAuth()           // Auth context

    /**
     * Fetch host vans on component mount
     */
    useEffect(() => {
        const loadVans = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, token, setToken)

                const data = await res.json()

                if (!res.ok) {
                    throw new Error('Failed to fetch vans!')
                }

                setVans(data || []);

            } catch (error) {
                setError(error.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }
        }

        if (token) {
            loadVans();
        }

    }, [token])


    /**
    * Render list of vans
    */
    const hostVansElements = vans.map(van => (
        <Link key={van._id} to={`/host/vans/${van._id}`} className='host-van-link-wrapper'>

            <div className="host-van-card">
                <img src={van.imageUrl} alt={van.name} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>{`$${van.price}/day`}</p>
                </div>
            </div>

        </Link>
    ))


    return (
        <section>
            {/* Page header with add button */}
            <div className='host-vans-title-container'>
                <h1>Your listed vans</h1>

                {/* Navigate to create new van */}
                <Link to={'new'}><AddCircleOutlineIcon /></Link>
            </div>

            {/* Vans list */}
            <div className="host-vans-list-container">

                {/* Loading state */}
                {loading && <h2 className='van-loading'>Loading..</h2>}

                {/* Error state */}
                {error && <h2 className='van-error'>{error}</h2>}

                {/* Success state */}
                {!loading && !error && (
                    vans.length > 0 ? hostVansElements : <h3>No vans yet. Start by adding one!</h3>)
                }
            </div>
        </section>
    )
}