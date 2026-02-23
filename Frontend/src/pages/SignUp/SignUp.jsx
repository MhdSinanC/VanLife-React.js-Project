import React from 'react';
import './SignUp.css'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'





export default function SignUp() {

    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_]{6,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const isEmailValid = formData.email === '' || emailRegex.test(formData.email);
    const isUsernameValid = formData.username === '' || usernameRegex.test(formData.username)
    const isPasswordValid = formData.password === '' || passwordRegex.test(formData.password);
    const isPasswordMatch = formData.confirmPassword === '' || formData.password === formData.confirmPassword;
    const isFormValid = formData.email && formData.username && formData.password && isPasswordMatch;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (
            { ...prev, [name]: value }
        ))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        //last defence for the backend
        if (!isEmailValid || !isUsernameValid || !isPasswordValid || !isPasswordMatch) {
            setError('Please fix the errors');
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message);
            }
            setToken(data.token);
            navigate('/');
            setFormData({ email: '', username: '', password: '', confirmPassword: '' })
            setError(null)

        }
        catch (e) {
            setError(e.message)
        }

    }







    return (
        <div className="signup-container">

            <Box
                component="form"
                onSubmit={handleSubmit}
                className='signup-form'
                sx={{ m: 2, p: 2, width: '100%', maxWidth: '40ch', display: 'flex', flexDirection: 'column' }}
                autoComplete="off"
            >
                <h1>Create your account</h1>
                {error &&
                    <Alert sx={{ backgroundColor: '#ff000030' }} severity="error">{error}</Alert>
                }

                <TextField
                    error={!isEmailValid}
                    helperText={!isEmailValid && "Enter a valid email address"}
                    label="Email"
                    name='email'
                    type='email'
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={formData.email}
                    required
                />

                <TextField
                    error={!isUsernameValid}
                    helperText={!isUsernameValid && "6–20 characters · letters, numbers, underscores · must include a letter or number"}
                    label="Username"
                    name='username'
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={formData.username}
                    required
                />

                <TextField
                    error={!isPasswordMatch || !isPasswordValid}
                    helperText={
                        !isPasswordValid ? "Password must be at least 8 characters and include a letter, number, and special character"
                            :
                            !isPasswordMatch ? "Passwords do not match" : ''}
                    label="Password"
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={formData.password}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge='end'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ?
                                         <VisibilityOffIcon/> : 
                                         <VisibilityIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    required
                />

                <TextField
                    error={!isPasswordMatch}
                    helperText={!isPasswordMatch && "Passwords do not match"}
                    label="Confirm password"
                    name='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge='end'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ?
                                         <VisibilityOffIcon/> : 
                                         <VisibilityIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    required
                />

                <button className='signup-button' disabled={!isFormValid}>Sign Up</button>

            </Box>

        </div>
    )
}