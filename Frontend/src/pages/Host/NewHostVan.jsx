import React from 'react';
import './NewHostVan.css';
import { Alert, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NewHostVan() {

    const { token } = useAuth();
    const navigate = useNavigate();

    const [newVanData, setNewVanData] = React.useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        type: 'simple'
    })
    const [error, setError] = React.useState(null)

    const types = [
        {
            value: 'simple',
            label: 'Simple',
        },
        {
            value: 'rugged',
            label: 'Rugged',
        },
        {
            value: 'luxury',
            label: 'Luxury',
        }
    ];

    //name validation
    const isNameValid = newVanData.name.trim() === '' || newVanData.name.trim().length >= 6;

    //price validation
    const isPriceValid = newVanData.price === '' || Number(newVanData.price) >= 1

    //description validation
    const isDescriptionValid = newVanData.description.trim() === '' ||
        (newVanData.description.trim().length >= 50 &&
            newVanData.description.trim().length <= 200);


    //imageUrl validation
    const isValidUrl = (url) => {
        const imageExtensionRegex = /\.(jpg|jpeg|png|webp|gif)$/i;
        try {
            const parsed = new URL(url);
            return (
                url !== '' &&
                (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
                imageExtensionRegex.test(parsed.pathname)
            )
        }
        catch {
            return false;
        }
    }
    const trimmedImageUrl = newVanData.imageUrl.trim();
    const isImageUrlValid = newVanData.imageUrl === '' || isValidUrl(trimmedImageUrl)

    //disable button if any fields are false
    const isFormValid = isNameValid && isPriceValid && isImageUrlValid && isDescriptionValid


    const onChange = (e) => {
        const { name, value } = e.target;
        setNewVanData(prev => (
            { ...prev, [name]: value }
        ))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //defending for backend
        if (!isNameValid || !isPriceValid || !isImageUrlValid || !isDescriptionValid) {
            setError('All Fields are required!')
            return;
        }

        try {
            const res = await fetch('/api/host/vans', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newVanData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            navigate('/host/vans')
            setError(null)
            setNewVanData({
                name: '',
                price: '',
                description: '',
                imageUrl: '',
                type: 'simple'
            })


        }
        catch (e) {
            setError(e.message)
        }


    }



    return (
        <>
            {error && <Alert variant="filled" severity="error">
                {error}
            </Alert>}
            <h3 style={{ textAlign: 'center' }}>ADD NEW VAN</h3>
            <form className='new-van-form' onSubmit={onSubmit}>
                <TextField
                    id="filled-basic"
                    error={!isNameValid}
                    helperText={!isNameValid && 'name must be 6 char long'}
                    name='name'
                    value={newVanData.name}
                    label="Van Name"
                    variant="filled"
                    onChange={onChange}
                    sx={{ maxWidth: '26.9rem', width: '100%' }}
                />

                <TextField
                    id="filled-basic"
                    name='imageUrl'
                    error={!isImageUrlValid}
                    helperText={!isImageUrlValid && 'Should be an image URL'}
                    value={newVanData.imageUrl}
                    label="Image URL"
                    variant="filled"
                    onChange={onChange}
                    sx={{ maxWidth: '26.9rem', width: '100%' }}
                />

                <div className='van-type-and-price-container'>

                    <TextField
                        id="outlined-select-currency"
                        name='type'
                        value={newVanData.type}
                        select
                        sx={{ width: '13rem' }}
                        label="Van Type"
                        helperText="Please select your van type"
                        onChange={onChange}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="filled-basic"
                        name='price'
                        type='number'
                        error={!isPriceValid}
                        helperText={!isPriceValid && 'must be more than $1'}
                        value={newVanData.price}
                        label="Price"
                        variant="filled"
                        sx={{ maxWidth: '13rem', width: '100%' }}
                        onChange={onChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <TextField
                    id="outlined-multiline-static"
                    name='description'
                    error={!isDescriptionValid}
                    helperText={!isDescriptionValid && 'Description should be 50-200 characters'}
                    value={newVanData.description}
                    label="Description"
                    multiline
                    rows={4}
                    sx={{ maxWidth: '26.9rem', width: '100%' }}
                    onChange={onChange}
                    placeholder='Tell about your van..'

                />

                <button disabled={!isFormValid} className={`add-new-van-button ${!isFormValid ? 'disabled' : ''}`}>Submit</button>
            </form>
        </>

    )
}