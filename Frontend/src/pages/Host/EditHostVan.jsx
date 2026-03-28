import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import VanForm from "../../components/VanForm";
import { useEffect, useState } from "react";


/**
 * EditHostVan
 * -------------
 * Allows a host to edit an existing van.
 * Responsibilities:
 * - Fetch existing van data
 * - Populate form with initial values
 * - Handle update request
 */
export default function EditHostVan() {

    const { token } = useAuth();        // Access auth token
    const navigate = useNavigate();     // For navigation after update
    const { id } = useParams();         // Get van ID from URL

    const [van, setVan] = useState(null);     // Stores fetched van data
    const [error, setError] = useState(null); // Stores error messages


    /**
    * Fetch van details when component mounts or ID/token changes
    */
    useEffect(() => {
        const fetchVan = async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                const data = await res.json();

                if (!res.ok) {
                    throw new Error("Couldn't fetch the van data")
                }

                setVan(data.data);

            }
            catch (error) {
                setError(error.message)
            }

        }

        if (token) {
            fetchVan()      // Only fetch when token is available
        }

    }, [id, token])


    /**
     * Handles form submission for updating van
     */
    const handleUpdateVan = async (formData) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans/${id}`, {
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

            // Redirect to vans list after successful update
            navigate('/host/vans')
        }
        catch (error) {
            setError(error.message);
        }
    }
    // Loading state
    if (!van) return <h2>Loading...</h2>

    return (
        <VanForm
            initialData={van}                   // Pre-fill form with existing data
            handleSubmit={handleUpdateVan}      // Submit handler
            error={error}                       // Pass error to form       
            submitLabel={'UPDATE VAN'}          // Button label
        />
    )
}