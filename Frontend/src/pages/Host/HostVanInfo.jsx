import { useOutletContext } from "react-router-dom"
import './HostVanInfo.css';

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
        <div className="host-van-nested-info">
            <h4>Name: <span>{currentVan.name}</span></h4>
            <h4>Category: <span>{currentVan.type}</span></h4>
            <h4>Description: <span>{currentVan.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
        </div>
    )
}