// Register.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import './Register.css'
const Register = () => {
    const {register} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        var result = register(username, password,emailAddress);
        if(result){
            navigate('/login');
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
