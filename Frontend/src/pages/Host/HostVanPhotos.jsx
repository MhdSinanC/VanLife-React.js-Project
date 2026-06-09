import { useOutletContext } from "react-router-dom"

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
                className="my-[1.6rem] max-w-[6.56rem] rounded-[0.32rem]"
                src={currentVan.imageUrl}
                alt={currentVan.name}
            />
    )
}