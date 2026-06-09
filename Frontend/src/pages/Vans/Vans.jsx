import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
// Icon for clearing filters
import CancelIcon from '@mui/icons-material/Cancel';


// Component to display list of vans with filtering
export default function Vans() {

    // State for vans data, loading, and errors
    const [vans, setVans] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL search params for filtering (e.g., ?type=simple)
    const [searchParams, setSearchParams] = useSearchParams();

    // Current filter value from URL
    const typeFilter = searchParams.get('type');

    // Filter vans based on selected type
    const filteredVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans;

    //tailwind style varibles
    const baseBtnStyle = ' py-1.75 px-6.5 text-[16px] no-underline rounded-[0.31rem] border border-black';
    const typeStyles = {
        simple: 'bg-[#E17654]',
        rugged: 'bg-[#115E59]',
        luxury: 'bg-[#161616]'
    }

    /**
    * Updates URL search params for filtering
    * @param {string} key - param key (e.g., 'type')
    * @param {string|null} value - param value or null to remove
    */
    const handleFilterChange = (key, value) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            if (value === null) {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
            return newParams;
        })
    }

    // Fetch vans data on component mount
    useEffect(() => {
        const loadVans = async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vans`);
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch vans');
                }

                // Store fetched vans (fallback to empty array)
                setVans(data.data || []);

            } catch (error) {
                // Handle API errors
                setError(error.message || 'Something went Wrong');

            } finally {
                // Stop loading state
                setLoading(false);
            }

        }
        loadVans();

    }, [])


    // Map vans into UI cards
    const vansCards = filteredVans.map(van => (

        <Link
            key={van._id}
            to={`/vans/${van._id}`}
            // Preserve current filter/search state when navigating
            state={{ search: searchParams.toString(), type: typeFilter }}
            className="link-reset"
        >
            <div className="van-card mb-4 max-w-97.5 max-h-125 w-full h-full bg-white py-6 px-8 rounded-lg flex flex-col justify-between">
                <div className="image-container max-h-97.5">
                    <img src={van.imageUrl} alt={van.name} className="w-full h-full rounded-lg object-cover" />
                </div>
                <div className="info-container">
                    <div className="van-info flex justify-between items-center">
                        <h3 className="text-[20px] leading-7.75 font-semibold my-6.25 min-[650px]:text-[25px] min-[650px]:leading-9">{van.name}</h3>
                        <p className="text-right min-[650px]:text-[18px]"><b>${van.price}</b><span>/day</span></p>
                    </div>
                    {/* Capitalize first letter of type */}
                    <i className={`van-type not-italic font-semibold rounded-[5px] text-[#FFEAD0] py-2.5 px-5 min-[650px]:text-[18px] ${typeStyles[van.type]}`}>
                        {van.type[0].toUpperCase() + van.type.slice(1)}
                    </i>
                </div>

            </div>
        </Link>
    ))




    return (
        <>
            <div className="van-list-container px-8 min-[950px]:max-w-325 min-[950px]:my-0 mx-auto">
                <h1 className="van-list-title text-[32px] font-semibold my-5.25 max-[500px]:text-[1.7rem]">Explore our van options</h1>

                {/* Filter buttons */}
                <div className="van-list-filter-buttons flex gap-4 my-8">

                    <button
                        onClick={() => handleFilterChange('type', 'simple')}
                        className={`van-type simple ${baseBtnStyle} max-[500px]:p-1.5  ${typeFilter === 'simple' ? 'bg-[#E17654] text-[#FFEAD0]' : 'bg-[#FFEAD0] text-[#4D4D4D] hover:bg-[#E17654] hover:text-[#FFEAD0]'}`} >
                        Simple
                    </button>

                    <button
                        onClick={() => handleFilterChange('type', 'rugged')}
                        className={`van-type rugged ${baseBtnStyle}  max-[500px]:p-1.5 ${typeFilter === 'rugged' ? 'bg-[#115E59] text-[#FFEAD0]' : 'bg-[#FFEAD0] text-[#4D4D4D] hover:bg-[#115E59] hover:text-[#FFEAD0]'}`} >
                        Rugged
                    </button>

                    <button
                        onClick={() => handleFilterChange('type', 'luxury')}
                        className={`van-type luxury ${baseBtnStyle}  max-[500px]:p-1.5 ${typeFilter === 'luxury' ? 'bg-[#161616] text-[#FFEAD0]' : 'bg-[#FFEAD0] text-[#4D4D4D] hover:bg-[#161616] hover:text-[#FFEAD0]'}`} >
                        Luxury
                    </button>

                    {/* Clear filter button */}
                    {typeFilter ?
                        <button
                            onClick={() => handleFilterChange('type', null)}
                            className={`van-type ${baseBtnStyle} clear-filters bg-inherit max-[500px]:py-0.5 max-[500px]:px-1.25`} >
                            <CancelIcon sx={{ fontSize: 15 }} className="my-auto" />
                        </button> : null}
                </div>

                {/* Loading state */}
                {loading && <h2 className="van-loading text-center mt-12" aria-live="polite">Loading vans...</h2>}
                {/* Error state */}
                {error && <h2 className="van-error text-center mt-12" aria-live="assertive">{error}</h2>}

                {/* Vans list */}
                {!loading && !error && (
                    <div className="van-list grid grid-cols-[1fr] gap-8 my-8 min-[550px]:grid-cols-[repeat(2,1fr)] min-[950px]:grid-cols-[repeat(3,1fr)]">
                        {vansCards}
                    </div>
                )}
            </div>
        </>
    )
}