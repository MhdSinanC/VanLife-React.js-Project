import React from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import './HostVanDetail.css';
import { getHostVans } from "../../../api";

export default function HostVanDetail() {

    const [currentVan, setCurrentVan] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { id } = useParams();

    const activeStyles = {
        textDecoration: 'underline',
        color: '#161616',
        fontWeight: 'bold'
    }

    React.useEffect(() => {
        const loadVans = async () => {

            try {
                const data = await getHostVans(id);
                setCurrentVan(data);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }

        }
        loadVans();
    }, [id])


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

                            <nav className="host-van-detail-nav">
                                <NavLink to={'.'}
                                    end
                                    style={({ isActive }) => isActive ? activeStyles : null}>
                                    Details
                                </NavLink>

                                <NavLink to={'pricing'}
                                    style={({ isActive }) => isActive ? activeStyles : null}>
                                    Pricing
                                </NavLink>

                                <NavLink to={'photos'}
                                    style={({ isActive }) => isActive ? activeStyles : null}>
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