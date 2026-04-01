import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import './Vans.css';
// Icon for clearing filters
import CancelIcon from '@mui/icons-material/Cancel';


// Component to display list of vans with filtering
export default function Vans() {

    // State for vans data, loading, and errors
    const [vans, setVans] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL search params for filtering (e.g., ?type=simple)
    const [searchParams, setSearchParams] = useSearchParams();

    // Current filter value from URL
    const typeFilter = searchParams.get('type');

    // Filter vans based on selected type
    const filteredVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans;

    /**
    * Updates URL search params for filtering
    * @param {string} key - param key (e.g., 'type')
    * @param {string|null} value - param value or null to remove
    */
    const handleFilterChange = (key, value) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            if (value === null) {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
            return newParams;
        })
    }

    // Fetch vans data on component mount
    useEffect(() => {
        const loadVans = async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vans`);
                const data = await res.json()

                if(!res.ok) {
                    throw new Error(data.message || 'Failed to fetch vans');
                }

                // Store fetched vans (fallback to empty array)
                setVans(data.data || []);

            } catch (error) {
                // Handle API errors
                setError(error.message || 'Something went Wrong');

            } finally {
                // Stop loading state
                setLoading(false);
            }

        }
        loadVans();

    }, [])


    // Map vans into UI cards
    const vansCards = filteredVans.map(van => (

        <Link
            key={van._id}
            to={`/vans/${van._id}`}
            // Preserve current filter/search state when navigating
            state={{ search: searchParams.toString(), type: typeFilter }}
            className="link-reset"
        >
            <div className="van-card">
                <div className="image-container">
                    <img src={van.imageUrl} alt={van.name} />
                </div>
                <div className="info-container">
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p><b>${van.price}</b><span>/day</span></p>
                    </div>
                    {/* Capitalize first letter of type */}
                    <i className={`van-type ${van.type}`}>
                        {van.type[0].toUpperCase() + van.type.slice(1)}
                    </i>
                </div>

            </div>
        </Link>
    ))


    return (
        <>
            <div className="van-list-container">
                <h1 className="van-list-title">Explore our van options</h1>

                {/* Filter buttons */}
                <div className="van-list-filter-buttons">

                    <button
                        onClick={() => handleFilterChange('type', 'simple')}
                        className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`} >
                        Simple
                    </button>

                    <button
                        onClick={() => handleFilterChange('type', 'rugged')}
                        className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`} >
                        Rugged
                    </button>

                    <button
                        onClick={() => handleFilterChange('type', 'luxury')}
                        className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`} >
                        Luxury
                    </button>

                    {/* Clear filter button */}
                    {typeFilter ?
                        <button
                            onClick={() => handleFilterChange('type', null)}
                            className="van-type clear-filters" >
                            <CancelIcon />
                        </button> : null}
                </div>

                {/* Loading state */}
                {loading && <h2 className="van-loading" aria-live="polite">Loading vans...</h2>}
                {/* Error state */}
                {error && <h2 className="van-error" aria-live="assertive">{error}</h2>}

                {/* Vans list */}
                {!loading && !error && (
                    <div className="van-list">
                        {vansCards}
                    </div>
                )}
            </div>
        </>
    )
}