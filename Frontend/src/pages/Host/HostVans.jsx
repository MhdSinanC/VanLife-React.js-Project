import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../utils/apiFetch';
import { useAuth } from '../../../Context/AuthContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

/**
 * HostVans
 * ----------
 * Displays all vans listed by the host.
 * Features:
 * - Fetch vans from API
 * - Show loading and error states
 * - Navigate to individual van details
 * - Provide option to add a new van
 */
export default function HostVans() {

    const [vans, setVans] = useState([]);         // Stores host vans
    const [error, setError] = useState(null);     // Error state
    const [loading, setLoading] = useState(true); // Loading state

    const { token, setToken } = useAuth()           // Auth context

    /**
     * Fetch host vans on component mount
     */
    useEffect(() => {
        const loadVans = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, token, setToken)

                const data = await res.json()

                if (!res.ok) {
                    throw new Error('Failed to fetch vans!')
                }

                setVans(data || []);

            } catch (error) {
                setError(error.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }
        }

        if (token) {
            loadVans();
        }

    }, [token])


    /**
    * Render list of vans
    */
    const hostVansElements = vans.map(van => (
        <Link key={van._id} to={`/host/vans/${van._id}`} className='host-van-link-wrapper'>

            <div className="host-van-card flex gap-4 items-center bg-[#FFF] py-4 px-[1.7rem] rounded-xl shadow-lg border border-[rgba(0,0,0,0.03)] min-[750px]:flex-col min-[750px]:items-start min-[750px]:justify-center min-[750px]:w-full min-[750px]:max-w-[20rem] min-[750px]:h-full min-[750px]:max-h-102">
                <img src={van.imageUrl} alt={van.name} className='max-w-20 max-h-20 rounded-[0.4rem] h-full w-full min-[750px]:min-w-full min-[750px]:max-h-65.75 min-[750px]:h-full min-[750px]:object-cover'/>
                <div className="host-van-info">
                    <h3 className='mb-0 mt-4 font-black text-[1.25rem]'>{van.name}</h3>
                    <p className='text-[#4D4D4D] my-[0.7rem]'>{`$${van.price}/day`}</p>
                </div>
            </div>

        </Link>
    ))


    return (
        <section className='p-4'>
            {/* Page header with add button */}
            <div className='host-vans-title-container flex items-center justify-between'>
                <h1 className='text-[32px] my-4.75 font-black'>Your listed vans</h1>

                {/* Navigate to create new van */}
                <Link className='text-[#8B6048] min-[750px]:before:content-["Add_new_van"] min-[750px]:before:mr-2 min-[750px]:flex min-[750px]:items-center min-[750px]:p-[0.6rem] min-[750px]:bg-[#F8E4CB] min-[750px]:rounded-lg min-[750px]:no-underline min-[750px]:shadow-[-1px_-1px_32px_-2px_rgba(110,111,70,0.1)] min-[750px]:border border-black' to={'new'}><AddCircleOutlineIcon /></Link>
            </div>

            {/* Vans list */}
            <div className="host-vans-list-container px-4 flex flex-col gap-[1.2rem] mb-8 min-[750px]:grid min-[750px]:grid-cols-[repeat(auto-fit,minmax(230px,325px))]">

                {/* Loading state */}
                {loading && <h2 className='van-loading'>Loading..</h2>}

                {/* Error state */}
                {error && <h2 className='van-error'>{error}</h2>}

                {/* Success state */}
                {!loading && !error && (
                    vans.length > 0 ? hostVansElements : <h3>No vans yet. Start by adding one!</h3>)
                }
            </div>
        </section>
    )
}