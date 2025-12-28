import React from 'react';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../api';

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    const isDisabled = status === 'submitting' || !loginFormData.email.trim() || !loginFormData.password.trim() ;

    const location = useLocation();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError(null);

        try {
            const data = await loginUser(loginFormData);
            console.log(data);

            localStorage.setItem('isLogged', 'true')
            localStorage.setItem('token', data.token)
            setStatus('idle');
            navigate(location.state?.from || '/host', {replace: true});

        } catch (e) {
            setError(e.message);
            setStatus('idle');
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