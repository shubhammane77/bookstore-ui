// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { postData } from '../../api/apiService';
import { REGISTER_USER_ENDPOINT } from '../../api/endpoints';
import { validateEmail } from '../../utils/util';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorResponse('')
        if (!validateEmail(emailAddress)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');
        // Proceed with registration
        register(username, password, emailAddress);

    };

    const register = async (username, password, email) => {
        const endpoint = REGISTER_USER_ENDPOINT;
        try {
            var request = { userName: username, password: password, emailAddress: email };
            const result = await postData(endpoint, request);
            if (result && result.errorMessage == null) {
                alert('User Registered Successfully.')
                navigate('/login');
            } else if(result.errorMessage != null) {
                setErrorResponse(result.errorMessage);
            }
            return result;
        } catch (error) {
            setErrorResponse('Error while registration', error);
        }
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
           {errorResponse && <p className="error-message">{errorResponse}</p>}
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
