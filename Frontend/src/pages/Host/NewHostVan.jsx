import {useState} from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VanForm from '../../components/VanForm';


// Component for creating a new van listing (host side)
export default function NewHostVan() {

    // Get authentication token from context
    const { token } = useAuth();

    // React Router navigation hook
    const navigate = useNavigate();

    // State to store any API or submission errors
    const [error, setError] = useState(null)



    /**
    * Handles form submission for creating a new van
    */
    const onSubmit = async (formData) => {

        try {
            // Sending POST request to backend API
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Attach JWT token for authorization
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            // Handle API errors
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            // Redirect to vans list after successful creation
            navigate('/host/vans')

            // Clear any previous errors
            setError(null)


        }
        catch (error) {
            // Capture and display error message
            setError(error.message)
        }

    }



    return (
        <VanForm initialData={{
            // Initial form values
            name: '',
            price: '',
            description: '',
            imageUrl: '',
            type: 'simple'
        }}
            // Submit handler passed to reusable form component
            handleSubmit={onSubmit}
            // Error message passed for display in form
            error={error}
            // Button label customization
            submitLabel={'ADD NEW VAN'}
        />
    )
}
