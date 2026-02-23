import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import VanForm from "../../components/VanForm";
import React from "react";

export default function EditHostVan() {

    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [van, setVan] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {

        const fetchVan = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json();
            if (!res.ok) {
                setError("Couldn't fetch the van data")
            }
            setVan(data);
        }
        fetchVan();
    }, [id, token])


    const handleUpdateVan = async (formData) => {
        try {
            const res = await fetch(`/api/host/vans/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Update failed');
            }

            navigate('/host/vans')
        }
        catch (e) {
            setError(e.message);
        }
    }

    if (!van) return <h2>Loading...</h2>

    return (
        <VanForm
            initialData={van}
            handleSubmit={handleUpdateVan}
            error={error}
            submitLabel={'UPDATE VAN'}
        />
    )
}