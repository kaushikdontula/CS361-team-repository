import React, { useState } from "react";
import secureLocalStorage from 'react-secure-storage';

export const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(localStorage.getItem('email') === email){
            alert('Error: Email already in use');
            return;
        }
        if (pass.length < 8) {
            alert('Error: Password must be at least 8 characters long');
            return;
        }
        
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        secureLocalStorage.setItem('pass', pass);
        alert('Account created successfully');


        if(props.onSubmit){
            props.onSubmit();
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}