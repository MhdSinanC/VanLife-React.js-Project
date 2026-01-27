import React from "react";
import { BsStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import './Dashboard.css'
import { apiFetch } from "../../../HelperFunctions/apiFetch";
import { useAuth } from "../../../Context/AuthContext";

export default function Dashboard() {

    const [vans, setVans] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const {token} = useAuth();

    React.useEffect(() => {
        const loadVans = async () => {
            try {
                setLoading(true)
                const res = await apiFetch('/api/host/vans', token)
                const data = await res.json()
                setVans(data || []);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, [])

    function renderVanElements(vans) {
        const hostVanEls = vans.map(van => (

            <div key={van.id} className="host-van-card">
                <img src={van.imageUrl} alt={van.name} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>{`$${van.price}/day`}</p>
                </div>
                <Link className="dashboard-link-button ml-auto" to={`vans/${van.id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-vans-list-container">
                {hostVanEls}
            </div>
        )
    }


    if (error) {
        return <h1>Error: {error.message}</h1>
    }



    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="earnings-info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,890</h2>
                </div>
                <Link className="dashboard-link-button" to={'income'}>Details</Link>
            </section>

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

            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link className="dashboard-link-button" to='vans'>View all</Link>
                </div>
                {loading && !vans ?
                    <h1>Loading...</h1> :
                    (
                        <>
                            {renderVanElements(vans)}
                        </>
                    )}
            </section>

        </>
    )
}