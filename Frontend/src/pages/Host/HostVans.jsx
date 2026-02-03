import React from 'react';
import './HostVans.css';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../utils/apiFetch';
import { useAuth } from '../../../Context/AuthContext';



export default function HostVans() {

    const [vans, setVans] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const {token, setToken} = useAuth()

    React.useEffect(() => {
        const loadVans = async () => {
            try {
                const res = await apiFetch('/api/host/vans', token, setToken)
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


    const hostVansElements = vans.map(van => (
        <Link key={van.id} to={`/host/vans/${van.id}`} className='host-van-link-wrapper'>

            <div className="host-van-card">
                <img src={van.imageUrl} alt={van.name} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>{`$${van.price}/day`}</p>
                </div>
            </div>

        </Link>
    ))


    return (
        <section>
            <h1>Your listed vans</h1>
            <div className="host-vans-list-container">

                {loading && <h2 className='van-loading'>Loading..</h2>}
                {error && <h2 className='van-error'>{error}</h2>}

                {!loading && !error && (
                    vans.length > 0 ? hostVansElements : <h3>No Hosted Vans</h3>)
                }
            </div>
        </section>
    )
}