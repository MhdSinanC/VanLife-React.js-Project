import { useOutletContext } from "react-router-dom"

/**
 * HostVanInfo
 * ------------
 * Displays basic information about the selected van.
 * Receives data from parent route via Outlet context.
 */
export default function HostVanInfo() {
    // Access shared data passed from parent (HostVanDetail)
    const { currentVan } = useOutletContext();

    // Optional safety check (prevents crash if data is not ready)
    if (!currentVan) return <p>Loading...</p>

    return (
        <div className="max-w-112.5 text-[15px] leading-5.25 flex flex-col gap-2">
            <h4 className="mt-3 font-extrabold">Name: <span className="font-extralight">{currentVan.name}</span></h4>
            <h4 className="font-extrabold">Category: <span className="font-extralight">{currentVan.type}</span></h4>
            <h4 className="font-extrabold">Description: <span className="font-extralight">{currentVan.description}</span></h4>
            <h4 className="font-extrabold">Visibility: <span className="font-extralight">Public</span></h4>
        </div>
    )
}