/* eslint-disable react/prop-types */
import React from 'react';
import './VanForm.css';
import { Alert, InputAdornment, MenuItem, TextField } from "@mui/material";




export default function VanForm({ initialData, handleSubmit, error, submitLabel }) {

    const [formData, setFormData] = React.useState(initialData);

    React.useEffect(() => {
        setFormData(initialData)
    }, [initialData])

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
    const isNameValid = formData.name.trim() === '' || formData.name.trim().length >= 6;

    //price validation
    const isPriceValid = formData.price === '' || Number(formData.price) >= 1

    //description validation
    const isDescriptionValid = formData.description.trim() === '' ||
        (formData.description.trim().length >= 50 &&
            formData.description.trim().length <= 200);


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
    const trimmedImageUrl = formData.imageUrl.trim();
    const isImageUrlValid = formData.imageUrl === '' || isValidUrl(trimmedImageUrl)

    //disable button if any fields are false
    const isFormValid = isNameValid && isPriceValid && isImageUrlValid && isDescriptionValid


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (
            { ...prev, [name]: value }
        ))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //defending for backend
        if (!isNameValid || !isPriceValid || !isImageUrlValid || !isDescriptionValid) {
            return;
        }

        handleSubmit(formData);


    }



    return (
        <>
            {error && <Alert variant="filled" severity="error">
                {error}
            </Alert>}
            <h3 style={{ textAlign: 'center' }}>{submitLabel}</h3>
            <form className='new-van-form' onSubmit={onSubmit}>
                <TextField
                    id="filled-basic"
                    error={!isNameValid}
                    helperText={!isNameValid && 'name must be 6 char long'}
                    name='name'
                    value={formData.name}
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
                    value={formData.imageUrl}
                    label="Image URL"
                    variant="filled"
                    onChange={onChange}
                    sx={{ maxWidth: '26.9rem', width: '100%' }}
                />

                <div className='van-type-and-price-container'>

                    <TextField
                        id="outlined-select-currency"
                        name='type'
                        value={formData.type}
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
                        value={formData.price}
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
                    value={formData.description}
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
