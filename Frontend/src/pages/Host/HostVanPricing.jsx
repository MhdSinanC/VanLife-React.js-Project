import { useOutletContext } from "react-router-dom"
import './HostVanPricing.css'

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
            className="host-van-nested-price">
            ${currentVan.price.toFixed(2)}<span>/day</span>
        </h3>
    )
}