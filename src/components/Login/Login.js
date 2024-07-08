// Login.js
import React, { useContext, useState } from 'react';
import './Login.css'
import AuthContext from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        if (result.errorMessage == null) {
            navigate('/');
        } else {
            alert('Login failed: ' + result.errorMessage);
        }
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
                <button onClick={()=> navigate('/register')} type="submit">New User Registeration</button>
            </div>
        </div>
    );
};

export default Login;
