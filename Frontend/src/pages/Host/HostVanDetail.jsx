import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utils/apiFetch";
import { useAuth } from "../../../Context/AuthContext";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


/**
 * HostVanDetail
 * ---------------
 * Displays detailed information about a specific van owned by the host.
 * Features:
 * - Fetch van details
 * - Delete van
 * - Navigate to edit page
 * - Nested routes (details, pricing, photos)
 */
export default function HostVanDetail() {

    const [currentVan, setCurrentVan] = useState(null);     // Stores selected van
    const [loading, setLoading] = useState(true);           // Loading state
    const [error, setError] = useState(null);               // Error state

    const { id } = useParams();             // Van ID from URL
    const { token, setToken } = useAuth();  // Auth context
    const navigate = useNavigate();


    /**
     * Fetch van details when component mounts or ID/token changes
     */
    useEffect(() => {
        const loadVan = async () => {

            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/host/vans/${id}`, token, setToken)

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to load van details');
                }

                setCurrentVan(data.data);

            } catch (error) {
                setError(error.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }

        }

        if (token) {
            loadVan();
        }

    }, [id, token])


    /**
     * Handles deletion of the current van
     */
    const deleteVan = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this van?')
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans/${currentVan._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!res.ok) {
                throw new Error("Deletion failed");
            }

            // Redirect after successful deletion
            navigate('/host/vans')

        } catch (error) {
            console.error('Deletion failed:', error);
        }
    }

    const typeStyles = {
        simple: 'bg-[#E17654]',
        rugged: 'bg-[#115E59]',
        luxury: 'bg-[#161616]'
    }


    return (
        <>
            <section className="p-8 max-w-max">
                {/* Loading state */}
                {loading && <h2>Loading...</h2>}

                {/* Error state */}
                {error && <h2>{error}</h2>}

                {/* Main content */}
                {currentVan && (
                    <>
                        {/* Back navigation */}
                        <Link to={'..'} relative="path" className="mb-8 inline-block text-[#858585]">
                            &larr;<span className="ml-2 text-[#201F1D] hover:underline">Back to all vans</span>
                        </Link>

                        <div className="bg-white p-[1.56rem] rounded-md max-w-125 w-full">
                            {/* Van basic info */}
                            <div className="flex max-[375px]:flex-col max-[375px]:gap-4">
                                <img src={currentVan.imageUrl} alt={currentVan.name}
                                    className="max-w-40 max-h-40 w-full h-full object-cover"
                                />
                                <div className="flex flex-col justify-evenly pl-4 max-[375px]:pl-0 max-[375px]:mt-4">
                                    <span className={`text-[#FFEAD0] max-w-fit py-2 px-[1.1rem] rounded-[0.4rem] capitalize ${typeStyles[currentVan.type]}`}>{currentVan.type}</span>
                                    <h2 className="mb-0 text-[24px]">{currentVan.name}</h2>
                                    <p className="font-bold text-[19px] mt-[0.6rem]">${currentVan.price}<span className="font-medium text-[16px]">/day</span></p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div>
                                <button onClick={deleteVan} className="mt-2 text-[rgba(255,0,0,0.678)]">
                                    <DeleteIcon />
                                </button>
                                <Link className="text-[rgb(46,56,174)]" to={`/host/vans/${id}/edit`}>
                                    <EditIcon />
                                </Link>
                            </div>

                            {/* Sub-navigation for nested routes */}
                            <nav className="mt-8 flex gap-4 max-[375px]:mt-0">
                                <NavLink to={'.'}
                                    end
                                    className={({ isActive }) => `text-[#4D4D4D] text-[16px] hover:underline hover:text-[#161616] hover:font-bold ${isActive ? 'underline text-[#161616] font-bold' : ''}`}>
                                    Details
                                </NavLink>

                                <NavLink to={'pricing'}
                                    className={({ isActive }) => `text-[#4D4D4D] text-[16px] hover:underline hover:text-[#161616] hover:font-bold ${isActive ? 'underline text-[#161616] font-bold' : ''}`}>
                                    Pricing
                                </NavLink>

                                <NavLink to={'photos'}
                                    className={({ isActive }) => `text-[#4D4D4D] text-[16px] hover:underline hover:text-[#161616] hover:font-bold ${isActive ? 'underline text-[#161616] font-bold' : ''}`}>
                                    Photos
                                </NavLink>
                            </nav>

                            {/* Nested route content */}
                            <Outlet context={{ currentVan }} />
                        </div>

                    </>
                )}
            </section>
        </>
    )
}