import React from 'react';
import './Login.css';

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginFormData)
    }

    const handleChange = (e) => {

        const {name, value} = e.target;

        setLoginFormData(prev => (
            {...prev, [name] : value}
        ))

    }



    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form className="login-form" onSubmit={handleSubmit}>

                <input name='email' type="email" placeholder="Email address" onChange={handleChange} value={loginFormData.email}/>

                <input name='password' type="password" placeholder="Password" onChange={handleChange} value={loginFormData.password}/>

                <button>Sign in</button>
            </form>
        </div>
    )
}