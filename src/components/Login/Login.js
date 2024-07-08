// Login.js
import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { postData } from '../../apiService';
import { useDispatch } from 'react-redux';
import { user_login } from '../../redux/actions/userActions';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async (username, password) => {
        const endpoint = `/v1/auth/login`;
        try {
            var request = { userName: username, password: password };
            const result = await postData(endpoint, request);
            if (result.errorMessage != null) {
                alert(result.errorMessage);
            }
            if (result.errorMessage == null) {
                dispatch(user_login({ userId: result.userId, userName: username, token: result.jwtToken }));
                navigate('/');
            }
        } catch (error) {
            console.error('Error while login...', error);
            alert('Backend unreachable');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div className="form-group">
                <button onClick={handleSubmit} type="submit">Log In</button>
            </div>
            <div className="form-group">
                <button onClick={() => navigate('/register')} type="submit">New User Registeration</button>
            </div>
        </div>
    );
};

export default Login;
