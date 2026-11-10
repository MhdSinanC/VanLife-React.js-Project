import { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import RentModal from './RentModal';

// Component to display details of a single van
export default function VanDetails() {

    // State management
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [van, setVan] = useState(null);

    const { token } = useAuth();

    // Decode JWT payload to get current user's id
    // JWT format: header.payload.signature
    // atob() decodes base64 → the payload contains { id, email, iat, exp }
    const currentUserId = token
        ? JSON.parse(atob(token.split('.')[1])).id
        : null;

    const isOwnVan = van && currentUserId && van.hostId === currentUserId;

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Access route params and location state
    const { id } = useParams();
    const location = useLocation();

    //tailwind style variable
    const typeStyles = {
        simple: 'bg-[#E17654]',
        rugged: 'bg-[#115E59]',
        luxury: 'bg-[#161616]'
    }

    // Fetch van details on component mount / id change
    useEffect(() => {
        const loadVans = async () => {

            try {
                // API call to fetch van by ID
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vans/${id}`)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch van details')
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
            <div className="van-detail-wrapper min-[700px]:px-16 min-[700px]:max-w-300 min-[700px]:my-0 min-[700px]:mx-auto px-4">
                <h2 style={{ textAlign: 'center' }}>Fetching van details...</h2>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="van-detail-wrapper min-[700px]:px-16 min-[700px]:max-w-300 min-[700px]:my-0 min-[700px]:mx-auto px-4">
                <h3 style={{ textAlign: 'center' }}>{error}</h3>
            </div>
        )
    }

    return (
        <div className="van-detail-wrapper min-[700px]:px-16 min-[700px]:max-w-300 min-[700px]:my-0 min-[700px]:mx-auto px-4">
            {/* Back navigation (preserves previous filters/search params) */}
            <Link to={`..?${location.state?.search}`} relative='path' className='back-buton my-4 inline-block'>
                &larr;<span>Back to {location.state?.type ?? 'all'} vans</span>
            </Link>

            <div className="van-detail-container p-4 min-[700px]:flex min-[700px]:justify-center">

                {/* Van details (render only when data is available) */}
                {van && (
                    <div className='van-detail min-[700px]:flex min-[700px]:justify-center min-[700px]:items-center min-[700px]:max-w-7xl min-[700px]:mb-4'>
                        <img src={van.imageUrl} alt={van.name} className='max-w-full rounded-[5px] min-[700px]:w-[50%] min-[700px]:max-w-127.5 min-[700px]:min-h-125 min-[700px]:object-cover' />

                        <div className="van-detail-info min-[700px]:w-[50%] min-[700px]:py-4 min-[700px]:px-8 min-[700px]:flex min-[700px]:flex-col min-[700px]:gap-4">
                            {/* Van type badge */}
                            <span className={`van-type text-[#FFEAD0] py-1 px-3.25 capitalize font-semibold leading-7.75 rounded-[5px] mt-8 inline-block min-[700px]:max-w-max ${typeStyles[van.type]}`}>{van.type}</span>

                            <h2 className='text-[32px] mt-6.5 font-black'>{van.name}</h2>

                            {/* Pricing */}
                            <p className='van-price text-[20px] my-5'><span className='font-bold text-2xl'>${van.price}</span>/day</p>

                            {/* Description */}
                            <p className='van-description leading-5.75 mb-[1.2rem] mt-4'>{van.description}</p>

                            {/* Action button */}
                            {isOwnVan ? (
                                <p className='text-gray-500 italic text-center py-2 border rounded-md'>
                                    🚐 This is your van - you can't rent it
                                </p>
                            ) : (
                                <>
                                    <button
                                        className='link-button text-white bg-[#FF8C38] mb-4 min-w-full text-[18px] py-2 px-4 rounded-md font-bold'
                                        onClick={() => {
                                            if (!token) {
                                                navigate('/login', { state: { message: 'Please login to rent a van' } });
                                            } else {
                                                setShowModal(true);
                                            }
                                        }}
                                    >
                                        Rent this van
                                    </button>

                                    {/* Rent Modal — only mounts when showModal is true */}
                                    {showModal && (
                                        <RentModal van={van} onClose={() => setShowModal(false)} />
                                    )}
                                </>
                            )}

                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}