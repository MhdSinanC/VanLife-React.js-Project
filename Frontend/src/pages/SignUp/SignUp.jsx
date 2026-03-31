import { useState } from 'react';
import './SignUp.css'
// Material UI components for layout and inputs
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
// Auth + routing
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
// Icons for password visibility toggle
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


// SignUp component handles user registration
export default function SignUp() {

    const { setToken } = useAuth();
    const navigate = useNavigate();

    // Error state for API/validation messages
    const [error, setError] = useState(null);

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [signupData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    // Validation regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_]{6,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    // Validation checks (real-time feedback)
    const isEmailValid = signupData.email === '' || emailRegex.test(signupData.email);
    const isUsernameValid = signupData.username === '' || usernameRegex.test(signupData.username)
    const isPasswordValid = signupData.password === '' || passwordRegex.test(signupData.password);
    const isPasswordMatch = signupData.confirmPassword === '' || signupData.password === signupData.confirmPassword;

    // Form validity (controls submit button)
    const isFormValid = signupData.email && signupData.username && signupData.password && isPasswordMatch;


    /**
     * Handles input changes dynamically
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => (
            { ...prev, [name]: value }
        ))
    }

    /**
     * Handles form submission (signup API call)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation before API call (defensive check)
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
                body: JSON.stringify(signupData)
            })

            const data = await res.json()

            // Handle API errors
            if (!res.ok) {
                throw new Error(data.message);
            }
            // Save token and redirect
            setToken(data.token);
            navigate('/');
            // Reset form after successful signup
            setFormData({ email: '', username: '', password: '', confirmPassword: '' })
            setError(null)

        }
        catch (error) {
            setError(error.message)
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

                {/* Error alert */}
                {error &&
                    <Alert sx={{ backgroundColor: '#ff000030' }} severity="error">{error}</Alert>
                }

                {/* Email input */}
                <TextField
                    error={!isEmailValid}
                    helperText={!isEmailValid && "Enter a valid email address"}
                    label="Email"
                    name='email'
                    type='email'
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={signupData.email}
                    required
                />

                {/* Username input */}
                <TextField
                    error={!isUsernameValid}
                    helperText={!isUsernameValid && "6–20 characters · letters, numbers, underscores · must include a letter or number"}
                    label="Username"
                    name='username'
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={signupData.username}
                    required
                />

                {/* Password input */}
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
                    value={signupData.password}
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
                                            <VisibilityOffIcon /> :
                                            <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    required
                />

                {/* Confirm password input */}
                <TextField
                    error={!isPasswordMatch}
                    helperText={!isPasswordMatch && "Passwords do not match"}
                    label="Confirm password"
                    name='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={signupData.confirmPassword}
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
                                            <VisibilityOffIcon /> :
                                            <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    required
                />

                {/* Submit button */}
                <button className='signup-button' disabled={!isFormValid}>Sign Up</button>

            </Box>

        </div>
    )
}