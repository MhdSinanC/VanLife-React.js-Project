import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { apiFetch } from "../../../utils/apiFetch";
import { useAuth } from "../../../Context/AuthContext";


/**
 * Dashboard
 * ----------
 * Host dashboard displaying:
 * - Earnings summary
 * - Review score
 * - List of host's vans
 */
export default function Dashboard() {

    const [vans, setVans] = useState([]);               // Stores fetched vans
    const [loading, setLoading] = useState(false);      // Tracks loading state
    const [error, setError] = useState(null);           // Stores error message (if any)

    const { token, setToken } = useAuth();              // Auth context (for protected API calls)


    /**
     * Fetch host vans on component mount and refetch when token updates
     */
    useEffect(() => {
        const loadVans = async () => {
            try {
                setLoading(true)
                // Custom fetch utility (handles auth + token refresh)
                const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, token, setToken)
                const data = await res.json()
                // Ensure safe fallback if response is empty
                setVans(data || []);

            } catch (e) {
                setError(e.message || 'Something went wrong!');

            } finally {
                setLoading(false);
            }
        }

        if (!token) return;     // wait until token exists
        loadVans();

    }, [token])

    /**
     * Renders list of vans
     */
    function renderVanElements(vans) {
        const hostVanEls = vans.map(van => (

            <div key={van._id} className="flex gap-4 items-center bg-[#FFF] py-4 px-[1.7rem] rounded-xl shadow-lg border border-[rgba(0,0,0,0.03)] min-[750px]:flex-col min-[750px]:items-start min-[750px]:justify-center min-[750px]:w-full min-[750px]:max-w-[20rem] min-[750px]:h-full min-[750px]:max-h-102" style={{ maxHeight: 'none' }}>
                <img src={van.imageUrl} alt={van.name} className="max-w-20 max-h-20 rounded-[0.4rem] h-full w-full min-[750px]:min-w-full min-[750px]:max-h-65.75 min-[750px]:h-full min-[750px]:object-cover"/>
                <div>
                    <h3 className="mb-0 mt-4 font-black text-[1.25rem]">{van.name}</h3>
                    <p className="text-[#4D4D4D] my-[0.7rem]">{`$${van.price}/day`}</p>
                </div>
                <Link className="max-[750px]:ml-auto" to={`vans/${van._id}`}>View</Link>
            </div>
        ))

        return (
            <div className="px-4 flex flex-col gap-[1.2rem] mb-8 min-[750px]:grid min-[750px]:grid-cols-[repeat(auto-fit,minmax(230px,325px))]">
                {hostVanEls}
            </div>
        )
    }

    // Error state UI
    if (error) {
        return <h1>Error: {error}</h1>
    }



    return (
        <>
            {/* Earnings section */}
            <section className="bg-[#FFEAD0] flex justify-between items-center p-4">
                <div>
                    <h1 className="text-[36px] my-[1.2rem] font-black">Welcome!</h1>
                    <p className="text-[#4D4D4D] my-[0.8rem]">Income last <span className="underline font-bold">30 days</span></p>
                    <h2 className="text-[48px] font-extrabold my-8">$2,890</h2>
                </div>
                <Link className="text-[#161616]" to={'income'}>Details</Link>
            </section>

            {/* Reviews section */}
            <section className="flex items-center justify-between gap-4 px-4">
                <div className="reviews-info flex items-center">
                    <h2 className="text-[#161616] mr-3.75 my-4.75 text-[1.5rem] font-black">Review score</h2>
                    <BsStarFill className="star fill-[#FF8C38] text-[22px] mr-1.25" />
                    <p className="text-[20px] font-medium">
                        <span className="font-bold">5.0</span>/5
                    </p>
                </div>
                <Link to={'reviews'}>Details</Link>
            </section>

            {/* Vans listing section */}
            <section>
                <div className="top flex items-center justify-between px-4">
                    <h2 className="text-[24px] font-black my-4.75">Your listed vans</h2>
                    {vans.length > 0 && <Link className="dashboard-link-button max-[750px]:ml-auto" to='vans'>View all</Link>}
                </div>

                <div className="px-4">
                    {loading ?
                        <h3>Loading..</h3>
                        : vans.length === 0 ?
                            <h3>No vans found</h3>
                            : renderVanElements(vans)}
                </div>

            </section>

        </>
    )
}