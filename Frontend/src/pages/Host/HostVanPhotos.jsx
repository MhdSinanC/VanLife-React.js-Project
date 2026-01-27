import { useOutletContext } from "react-router-dom"
import './HostVanPhotos.css'

export default function HostVanPhotos() {

    const {currentVan} = useOutletContext();
    return (
        <>
        <img className="host-van-nested-photos" src={currentVan.imageUrl} alt={currentVan.name} />
        </>
    )
}