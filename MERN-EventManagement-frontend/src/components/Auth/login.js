// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../api/api';
import '../../css/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password });
            console.log('Login successful', response.data.token);

            // Save the token to localStorage
            localStorage.setItem('token', response.data.token); // Assuming `token` is in response.data
            console.log( response.data.token);

            // Redirect based on user role
            if (response.data.role === 'user') {
                navigate('/dashboard'); 
            } else if (response.data.role === 'admin') {
                navigate('/admin'); 
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed, please check your credentials.');
        }
    };

    return (
        <div className='login-container'>
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            
        </form>
        <p>New user</p><a href='/register'>Register here</a>
        </div>
    );
};

export default Login;
