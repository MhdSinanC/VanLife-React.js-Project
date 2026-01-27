import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './VanDetails.css';

export default function VanDetails() {

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [van, setVan] = React.useState(null);

    const location = useLocation();

    const { id } = useParams();

    React.useEffect(() => {
        const loadVans = async () => {

            try {
                
                const res = await fetch(`/api/vans/${id}`)     
                const data = await res.json()
                setVan(data);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }

        }
        loadVans();
    }, [id])

    return (
        <div className="van-detail-wrapper">
            <Link to={`..?${location.state?.search}`} relative='path' className='back-button'>
                &larr;<span>Back to {location.state?.type ?? 'all'} vans</span>
            </Link>
            <div className="van-detail-container">
                {van && (
                    <div className='van-detail'>
                        <img src={van.imageUrl} alt={van.name} />
                        <div className="van-detail-info">
                            <span className={`van-type ${van.type}`}>{van.type}</span>
                            <h2>{van.name}</h2>
                            <p className='van-price'><span>${van.price}</span>/day</p>
                            <p className='van-description'>{van.description}</p>
                            <button className='link-button'>Rent this van</button>
                        </div>

                    </div>
                )}
                {loading && <h2 style={{ textAlign: 'center' }}>Loading..</h2>}
                {error && <h3>{error}</h3>}
            </div>
        </div>
    )
}