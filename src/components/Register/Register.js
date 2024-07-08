// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { postData } from '../../apiService';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

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


    return (
        <div className="register-container">
            <h2>Register New User</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
            />
            <div className="form-group">
                <button type='submit' onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;
