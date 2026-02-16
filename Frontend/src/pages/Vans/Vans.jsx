import React from "react";
import './Vans.css';
import { Link, useSearchParams } from "react-router-dom";


export default function Vans() {

    const [vans, setVans] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get('type');
    const filteredVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans;

    //function to set the UrlParams
    const handleFilterChange = (key, value) => {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams;
        })
    }

    React.useEffect(() => {
        const loadVans = async () => {

            try {
                const res = await fetch('/api/vans');
                const data = await res.json()
                setVans(data || []);

            } catch (e) {
                setError(e.message || 'Something went Wrong');

            } finally {
                setLoading(false);
            }

        }
        loadVans();

    }, [vans])


    const vansCards = filteredVans.map(van => (

        <Link key={van._id} to={`/vans/${van._id}`} state={{ search: searchParams.toString(), type: typeFilter }} className="link-reset">
            <div className="van-card">
                <div className="image-container">
                    <img src={van.imageUrl} alt={van.name} />
                </div>
                <div className="info-container">
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p><b>${van.price}</b><span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type}`}>{van.type[0].toUpperCase() + van.type.slice(1)}</i>
                </div>

            </div>
        </Link>
    ))


    return (
        <>
            <div className="van-list-container">
                <h1>Explore our van options</h1>

                <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange('type', 'simple')}
                        className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`} >
                        Simple
                    </button>
                    <button
                        onClick={() => handleFilterChange('type', 'rugged')}
                        className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`} >
                        Rugged
                    </button>
                    <button
                        onClick={() => handleFilterChange('type', 'luxury')}
                        className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`} >
                        Luxury
                    </button>
                    {typeFilter ?
                        <button
                            onClick={() => handleFilterChange('type', null)}
                            className="van-type clear-filters" >
                            Clear filter
                        </button> : null}
                </div>

                {loading && <h2 className="van-loading" aria-live="polite">Loading vans...</h2>}
                {error && <h2 className="van-error" aria-live="assertive">{error}</h2>}

                {!loading && !error && (
                    <div className="van-list">
                        {vansCards}
                    </div>
                )}
            </div>
        </>
    )
}