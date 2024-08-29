import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Login} from '../Auth'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      navigate('/admindashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-table-wrapper">
        <table className="login-table">
          <tbody>
            <tr>
              <td className="login-form-cell">
                <div className="login-form">
                  <h1 className="login-title">Login</h1>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;