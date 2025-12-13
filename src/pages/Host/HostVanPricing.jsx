import { useOutletContext } from "react-router-dom"
import './HostVanPricing.css'

export default function HostVanPricing() {

    const { currentVan } = useOutletContext();

    return (
        <>
            <h3 className="host-van-nested-price">${currentVan.price}.00<span>/day</span></h3>
        </>
    )
}