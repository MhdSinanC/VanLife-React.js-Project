import React from 'react';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';


export default function Login() {

    const STATUS = {
        IDLE: 'idle',
        SUBMITTING: 'submitting'
    }
    

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState(STATUS.IDLE);
    const [error, setError] = React.useState(null);

    const isDisabled = status === STATUS.SUBMITTING || !loginFormData.email.trim() || !loginFormData.password.trim() ;

    const location = useLocation();
    const navigate = useNavigate();
    const {setToken} = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        setError(null);

        try {
            //Authentication is mocked for learning purposes :)
            const res = await fetch('/api/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFormData)
            })

            if(!res.ok) {
                throw new Error('Login failed')
            }

            const data = await res.json()

            setToken(data.token)
            setStatus(STATUS.IDLE);
            navigate(location.state?.from || '/host', {replace: true});

        } catch (e) {
            setError(e.message);
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
            {location.state?.message && <h3>{location.state.message}</h3>}
            <h1>Sign in to your account</h1>
            {error && <h3>{error}</h3>}
            <form className="login-form" onSubmit={handleSubmit}>

                <input name='email' type="email" placeholder="Email address" onChange={handleChange} value={loginFormData.email} />

                <input name='password' type="password" placeholder="Password" onChange={handleChange} value={loginFormData.password} />

                <button disabled={isDisabled}>{status === 'submitting' ? 'Logging In' : 'Log In'}</button>
            </form>
        </div>
    )
}