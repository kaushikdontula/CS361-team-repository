import React, { useState } from "react";
import secureLocalStorage from 'react-secure-storage';


export const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Retrieve the data from local storage
        const storedEmail = localStorage.getItem('email');
        const storedPassword = secureLocalStorage.getItem('pass');
    
        // Check if the entered email and password match the stored data
        if (email === storedEmail && pass === storedPassword) {
            alert('Login successful');
            if(props.onSubmit){
                props.onSubmit();
            }
        } else {
            alert('Error: Invalid email or password');
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}