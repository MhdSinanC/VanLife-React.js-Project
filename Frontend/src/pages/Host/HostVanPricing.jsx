import { useOutletContext } from "react-router-dom"

/**
 * HostVanPricing
 * ---------------
 * Displays pricing information for the selected van.
 * Receives data from parent via Outlet context.
 */
export default function HostVanPricing() {

    // Access shared van data from parent route
    const { currentVan } = useOutletContext();

    // Optional safety check
    if (!currentVan) return <p>Loading...</p>

    return (
        <h3
            className="font-medium text-[24px] text-[#161616] mt-8">
            ${currentVan.price.toFixed(2)}<span className="text-[16px] text-[#4D4D4D]">/day</span>
        </h3>
    )
}