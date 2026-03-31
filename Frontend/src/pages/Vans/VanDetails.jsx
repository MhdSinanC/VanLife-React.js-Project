import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './VanDetails.css';

// Component to display details of a single van
export default function VanDetails() {

    // State management
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [van, setVan] = useState(null);

    // Access route params and location state
    const { id } = useParams();
    const location = useLocation();

    // Fetch van details on component mount / id change
    useEffect(() => {
        const loadVans = async () => {

            try {
                // API call to fetch van by ID
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vans/${id}`)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error('Failed to fetch van details')
                }

                // Store fetched van data
                setVan(data.data);

            } catch (e) {
                // Handle errors
                setError(e.message || 'Something went wrong!');

            } finally {
                // Stop loading
                setLoading(false);
            }

        }
        loadVans();
    }, [id])

    //Loading state
    if (loading) {
        return (
            <div className="van-detail-wrapper">
                <h2 style={{ textAlign: 'center' }}>Fetching van details...</h2>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="van-detail-wrapper">
                <h3 style={{textAlign: 'center'}}>{error}</h3>
            </div>
        )
    }

    return (
        <div className="van-detail-wrapper">
            {/* Back navigation (preserves previous filters/search params) */}
            <Link to={`..?${location.state?.search}`} relative='path' className='back-button'>
                &larr;<span>Back to {location.state?.type ?? 'all'} vans</span>
            </Link>

            <div className="van-detail-container">

                {/* Van details (render only when data is available) */}
                {van && (
                    <div className='van-detail'>
                        <img src={van.imageUrl} alt={van.name} />

                        <div className="van-detail-info">
                            {/* Van type badge */}
                            <span className={`van-type ${van.type}`}>{van.type}</span>

                            <h2>{van.name}</h2>

                            {/* Pricing */}
                            <p className='van-price'><span>${van.price}</span>/day</p>

                            {/* Description */}
                            <p className='van-description'>{van.description}</p>

                            {/* Action button */}
                            <button className='link-button'>Rent this van</button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}