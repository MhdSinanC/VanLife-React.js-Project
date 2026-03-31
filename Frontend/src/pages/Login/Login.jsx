import { useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Auth context for managing authentication state
import { useAuth } from '../../../Context/AuthContext';
// Material UI components for UI/UX
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

// Login component handles user authentication
export default function Login() {

    // Status constants to manage form submission state
    const STATUS = {
        IDLE: 'idle',
        SUBMITTING: 'submitting'
    }

    // Form state for email and password inputs
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    // Tracks current form status (idle / submitting)
    const [status, setStatus] = useState(STATUS.IDLE);
    // Stores error messages from API or validation
    const [error, setError] = useState(null);
    // Toggles password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Disable button if submitting or inputs are empty
    const isDisabled = status === STATUS.SUBMITTING || !loginFormData.email.trim() || !loginFormData.password.trim();

    // React Router hooks
    const location = useLocation();
    const navigate = useNavigate();
    // Auth context setter for storing token
    const { setToken } = useAuth();

    /**
    * Handles login form submission
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set submitting state and clear previous errors
        setStatus(STATUS.SUBMITTING);
        setError(null);

        try {
            // API call to login endpoint
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'post',
                credentials: 'include',         // allows cookies if used by backend
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFormData)
            })

            const data = await res.json()

            // Handle API error response
            if (!res.ok) {
                throw new Error(data.message)
            }

            // Save token in auth context
            setToken(data.token)

            // Redirect user to previous page or default dashboard
            navigate(location.state?.from || '/host', { replace: true });

        }
        catch (error) {
            // Display error message
            setError(error.message);
        }
        finally {
            // Reset status back to idle
            setStatus(STATUS.IDLE);
        }
    }


    /**
     * Handles input field changes
     */
    const handleChange = (e) => {

        const { name, value } = e.target;

        // Update form state dynamically
        setLoginFormData(prev => (
            { ...prev, [name]: value }
        ))

    }



    return (
        <div className="login-container">

            {/* Message from protected route redirect (e.g., "Please log in first") */}
            {location.state?.message &&
                <Alert sx={{ backgroundColor: '#fde6c6' }} severity="warning">
                    {location.state.message}
                </Alert>
            }
            <h1>Log in to your account</h1>

            {/* Error alert */}
            {error &&
                <Alert sx={{ backgroundColor: '#ff000030', marginBottom: '1rem' }} severity="error">
                    {error}
                </Alert>
            }

            <form className="login-form" onSubmit={handleSubmit}>

                {/* Email input */}
                <TextField
                    label="Email"
                    name='email'
                    type='email'
                    variant="outlined"
                    onChange={handleChange}
                    value={loginFormData.email}
                    required
                />

                {/* Password input with visibility toggle */}
                <TextField
                    label="Password"
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='input'
                    onChange={handleChange}
                    value={loginFormData.password}
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
                <button disabled={isDisabled} className={isDisabled ? 'disabled' : ''}>
                    {status === 'submitting' ? 'Logging in...' : 'Log In'}
                </button>

                {/* Navigation to signup */}
                <Link className='signup-link' to={'/signup'}>Don&apos;t have an account ?</Link>
            </form>
        </div>  
    )
}