
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../utils/Helpers/GlobalToast';
//const navigate=useNavigate();
import { handleValidationError } from '../../../utils/Errors/HandleApiError';
import { verifyAdmin,verifyUser } from '../../services/service';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false); // Add validation state
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setValidationErrors('Please fill out all required fields.');
      return;
    }


  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', { usernameOrEmail, password });
    
    localStorage.setItem('authToken', response.data.accessToken);
    localStorage.setItem('userId', response.data.user_id);
    localStorage.setItem('userRole', response.data.role);
    localStorage.setItem('customerId', response.data.customerId);
    
    const getToken = localStorage.getItem('authToken');

    if(localStorage.getItem('userRole')=="ROLE_ADMIN"){
      if(verifyAdmin){
        console.log("admin board");
        navigate('/admindashboard');
        notify('Logged in successfully!', 'success');
      } else {
        navigate('/login');
      }
    }

    if(localStorage.getItem('userRole')=="ROLE_USER"){
           if(verifyUser){
        console.log("USER board");
        navigate('/userdashboard');
        notify('Logged in successfully!', 'success');
      } else {
        notify('veriofication Not DONE check!','error');
        navigate('/login');
      }
    }
  } catch (error) {
    console.error('Error logging in:', error);
    notify('User Not registered. Kindly Register!', 'error');
  }
};
    const handleregister = () => {
      navigate('/registration');
    }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">LOGIN</h1>
      <form noValidate validated={validated} onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="usernameOrEmail" className="form-label">Username or Email:</label>
          <input
            type="text"
            className={`form-control form-control-lg ${validated && !usernameOrEmail ? 'is-invalid' : ''}`}
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback">Username or Email is required.</div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className={`form-control form-control-lg ${validated && !password ? 'is-invalid' : ''}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback">Password is required.</div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-4">Login</button>
        <button onClick={handleregister} className="btn btn-primary btn-lg mt-4 " style={{ marginLeft: '10px' }}>
      Click to register
    </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
