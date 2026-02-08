import React from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


export default function Login() {

    const STATUS = {
        IDLE: 'idle',
        SUBMITTING: 'submitting'
    }


    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState(STATUS.IDLE);
    const [error, setError] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const isDisabled = status === STATUS.SUBMITTING || !loginFormData.email.trim() || !loginFormData.password.trim();

    const location = useLocation();
    const navigate = useNavigate();
    const { setToken } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        setError(null);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFormData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }

            setToken(data.token)
            navigate(location.state?.from || '/host', { replace: true });

        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setStatus(STATUS.IDLE);
        }
    }


    const handleChange = (e) => {

        const { name, value } = e.target;

        setLoginFormData(prev => (
            { ...prev, [name]: value }
        ))

    }



    return (
        <div className="login-container">
            {location.state?.message && <Alert sx={{ backgroundColor: '#fde6c6' }} severity="warning">{location.state.message}</Alert>}
            <h1>Log in to your account</h1>
            {error && <Alert sx={{ backgroundColor: '#ff000030', marginBottom: '1rem' }} severity="error">{error}</Alert>}
            <form className="login-form" onSubmit={handleSubmit}>

                <TextField
                    label="Email"
                    name='email'
                    type='email'
                    variant="outlined"
                    onChange={handleChange}
                    value={loginFormData.email}
                    required
                />

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


                <button disabled={isDisabled} className={isDisabled ? 'disabled' : ''}>
                    {status === 'submitting' ? 'Logging In' : 'Log In'}
                </button>

                <Link className='signup-link' to={'/signup'}>Dont have an account</Link>
            </form>
        </div>
    )
}