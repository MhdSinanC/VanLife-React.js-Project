import { useOutletContext } from "react-router-dom"
import './HostVanPhotos.css'

/**
 * HostVanPhotos
 * --------------
 * Displays the image of the selected van.
 * Receives van data from parent via Outlet context.
 */
export default function HostVanPhotos() {
    // Access shared van data from parent route
    const { currentVan } = useOutletContext();

    // Optional safety check (prevents crash if data is not ready)
    if (!currentVan) return <p>Loading....</p>

    return (
            <img
                className="host-van-nested-photos"
                src={currentVan.imageUrl}
                alt={currentVan.name}
            />
    )
}