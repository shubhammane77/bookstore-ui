// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { postData } from '../../apiService';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(emailAddress)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Clear any previous email errors
        setEmailError('');

        // Proceed with registration
        register(username, password, emailAddress);

    };

    const register = async (username, password, email) => {
        const endpoint = `/v1/auth/register`;
        try {
            var request = { userName: username, password: password, emailAddress: email };
            const result = await postData(endpoint, request);
            if (result && result.errorMessage == null) {
                alert('User Created.')
                navigate('/login');
            } else if(result.errorMessage != null) {
                alert(result.errorMessage);
            }
            return result;
        } catch (error) {
            console.error('Error while login', error);
        }
    };


    const validateEmail = (email) => {
        // Basic email format validation using regex
        // This regex is a simple one and may not cover all edge cases
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    return (
        <div className="register-container">
            <h2>Register New User</h2>
            <span>User name</span>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <span>Password</span>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <span>Email Address</span>
            <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
            />
           {emailError && <p className="error-message">{emailError}</p>}
            <div className="form-group">
                <button type='submit' onClick={handleSubmit}>Register</button>
            </div>
            <div className="form-group">
                <button onClick={() => navigate('/login')}>Back To Login</button>
            </div>
        </div>
    );
};

export default Register;
