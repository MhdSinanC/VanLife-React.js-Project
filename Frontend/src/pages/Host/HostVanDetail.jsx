import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import './HostVanDetail.css';
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

                const van = await res.json()

                if (!res.ok) {
                    throw new Error('Failed to load van details');
                }

                setCurrentVan(van.data);

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


    return (
        <>
            <section className="host-van-details-container">
                {/* Loading state */}
                {loading && <h2>Loading...</h2>}

                {/* Error state */}
                {error && <h2>{error}</h2>}

                {/* Main content */}
                {currentVan && (
                    <>
                        {/* Back navigation */}
                        <Link to={'..'} relative="path" className="back-button">
                            &larr;<span>Back to all vans</span>
                        </Link>

                        <div className="host-van-details-wrapper">
                            {/* Van basic info */}
                            <div className="host-van-detail">
                                <img src={currentVan.imageUrl} alt={currentVan.name} />
                                <div className="host-van-detail-info">
                                    <span className={currentVan.type}>{currentVan.type}</span>
                                    <h2>{currentVan.name}</h2>
                                    <p>${currentVan.price}<span>/day</span></p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="delete-edit-button-container">
                                <button onClick={deleteVan} className="delete-button">
                                    <DeleteIcon />
                                </button>
                                <Link className="edit-button" to={`/host/vans/${id}/edit`}>
                                    <EditIcon />
                                </Link>
                            </div>

                            {/* Sub-navigation for nested routes */}
                            <nav className="host-van-detail-nav">
                                <NavLink to={'.'}
                                    end
                                    className={({ isActive }) => isActive ? 'active' : ''}>
                                    Details
                                </NavLink>

                                <NavLink to={'pricing'}
                                    className={({ isActive }) => isActive ? 'active' : ''}>
                                    Pricing
                                </NavLink>

                                <NavLink to={'photos'}
                                    className={({ isActive }) => isActive ? 'active' : ''}>
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