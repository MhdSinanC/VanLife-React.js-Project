import React from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VanForm from '../../components/VanForm';



export default function NewHostVan() {

    const { token } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null)




    const onSubmit = async (formData) => {

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/host/vans`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            navigate('/host/vans')
            setError(null)


        }
        catch (e) {
            setError(e.message)
        }


    }



    return (
        <VanForm initialData={{
            name: '',
            price: '',
            description: '',
            imageUrl: '',
            type: 'simple'
        }}
        handleSubmit={onSubmit}
        error={error}
        submitLabel={'ADD NEW VAN'}/>
    )
}
