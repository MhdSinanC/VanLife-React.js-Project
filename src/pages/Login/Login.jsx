import React from 'react';
import './Login.css';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { loginUser } from '../../../api';

export default function Login() {

    const STATUS = {
        IDLE: 'idle',
        SUBMITTING: 'submitting'
    }

    const {setIsLogged} = useOutletContext();

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState(STATUS.IDLE);
    const [error, setError] = React.useState(null);

    const isDisabled = status === STATUS.SUBMITTING || !loginFormData.email.trim() || !loginFormData.password.trim() ;

    const location = useLocation();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        setError(null);

        try {
            //Authentication is mocked for learning purposes :)
            const data = await loginUser(loginFormData);
            console.log(data);

            localStorage.setItem('isLogged', 'true')
            localStorage.setItem('token', data.token)
            setIsLogged(true)
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