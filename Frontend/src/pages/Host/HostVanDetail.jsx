import React from "react";
import { useParams, Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import './HostVanDetail.css';
import { apiFetch } from "../../../utils/apiFetch";
import { useAuth } from "../../../Context/AuthContext";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function HostVanDetail() {

    const [currentVan, setCurrentVan] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { id } = useParams();
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    // const activeStyles = {
    //     textDecoration: 'underline',
    //     color: '#161616',
    //     fontWeight: 'bold'
    // }

    React.useEffect(() => {
        const loadVans = async () => {

            try {
                const res = await apiFetch(`/api/host/vans/${id}`, token, setToken)
                const data = await res.json()
                setCurrentVan(data);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }

        }
        loadVans();
    }, [id])



    const deleteVan = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this van?')
        if(!confirmDelete) return;

        try {
            const res = await fetch(`/api/host/vans/${currentVan._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.ok) {
                navigate('/host/vans')
            }
        } catch (e) {
            console.log('Deletion failed:', e);
        }
    }


    return (
        <>
            <section className="host-van-details-container">
                {loading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {currentVan && (
                    <>
                        <Link to={'..'} relative="path" className="back-button">
                            &larr;<span>Back to all vans</span>
                        </Link>
                        <div className="host-van-details-wrapper">
                            <div className="host-van-detail">
                                <img src={currentVan.imageUrl} alt={currentVan.name} />
                                <div className="host-van-detail-info">
                                    <span className={currentVan.type}>{currentVan.type}</span>
                                    <h2>{currentVan.name}</h2>
                                    <p>${currentVan.price}<span>/day</span></p>
                                </div>
                            </div>
                            <div className="delete-edit-button-container">
                                <button onClick={deleteVan} className="delete-button">
                                    <DeleteIcon />
                                </button>
                                <button className="edit-button">
                                    <EditIcon />
                                </button>
                            </div>

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
                            <Outlet context={{ currentVan }} />
                        </div>


                    </>
                )}

            </section>
        </>
    )
}