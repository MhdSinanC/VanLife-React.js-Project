import React from "react"
import './Vans.css'
import { Link } from "react-router-dom";


export default function Vans() {

    const [vans, setVans] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch('/api/vans');

                if (!res.ok) {
                    throw new Error('Failed to fetch Vans!');
                }

                const vansData = await res.json();
                setVans(vansData.vans || []);

            } catch (e) {
                setError(e.message || 'Something went Wrong');

            } finally {
                setLoading(false);
            }

        }
        fetchData();

    }, [])

    const vansElement = vans.map(van => (
        <div key={van.id} className="van-card">
            <Link to={`/vans/${van.id}`} className="link-reset">
                <img src={van.imageUrl} alt={van.name} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p><b>${van.price}</b><span>/day</span></p>
                </div>
                <i className={`van-type ${van.type}`}>{van.type[0].toUpperCase() + van.type.slice(1)}</i>
            </Link>

        </div>
    ))


    return (
        <>
            <div className="van-list-container">
                <h1>Explore our van options</h1>

                {loading && <h2 className="van-loading">Loading vans...</h2>}
                {error && <h2 className="van-error">{error}</h2>}

                {!loading && !error && (
                    <div className="van-list">
                        {vansElement}
                    </div>
                )}
            </div>
        </>
    )
}