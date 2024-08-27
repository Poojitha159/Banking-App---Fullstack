// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// import { notify } from '../../../utils/GlobalToast';

// //import './Login.css';


// const Login = () => {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/login', { usernameOrEmail, password });
      
      

//       localStorage.setItem('authToken',response.data.accessToken);
//       localStorage.setItem('userId',response.data.user_id);
//       localStorage.setItem('userRole',response.data.role);
//       localStorage.setItem('customerId',response.data.customerId);
      

//       if(localStorage.getItem('userRole')=="ROLE_ADMIN"){
//         if(verifyAdmin){
        
//         console.log("admin board")
//         navigate('/admindashboard');
//         notify('Loged successfully!', 'success'); 
        
//       }
//       else{
//         navigate('/login')
//       }
//       }
//       if(localStorage.getItem('userRole')=="ROLE_USER"){
//       if(verifyUser){
        
//           navigate('/userdashboard')
//           notify('Loged successfully!', 'success'); 

//         console.log("USER is not an admin");
      
//       }
//       else{
//         navigate('/login')
//       }
//     }
      

//     } catch (error) {
//       console.error('Error logging in:', error);
//       notify('Bad credentials!.', 'error');

//     }
//   };

//     const verifyAdmin = async () => {
//       const userId = localStorage.getItem('userId');
//       const gettoken = localStorage.getItem('authToken');
      
//       try {
//         const response = await axios.get(`http://localhost:8080/api/auth/verify-admin`,null, {
//           params: {
//             token: gettoken,
//           },
//         });
        
        
//         return response.data; // Should return a boolean or some other verification result
//       } catch (error) {
//         console.error('Error verifying user:', error);
//         return false;
//       }
//     };

//     const verifyUser = async () => {
//       const userId = localStorage.getItem('userId');
//       const gettoken = localStorage.getItem('authToken');


//       try {
//         const response = await axios.get(`http://localhost:8080/api/auth/verify-user`,null, {
//           params: {
//             token: gettoken,
//           },
//         });
//         return response.data; // Should return a boolean or some other verification result
//       } catch (error) {
//         console.error('Error verifying user:', error);
//         return false;
//       }
      
//     };


  
//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
//           <input
//             type="text"
//             className="form-control"
//             id="usernameOrEmail"
//             value={usernameOrEmail}
//             onChange={(e) => setUsernameOrEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };


// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../utils/GlobalToast';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { usernameOrEmail, password });
      
      

      localStorage.setItem('authToken',response.data.accessToken);
      localStorage.setItem('userId',response.data.user_id);
      localStorage.setItem('userRole',response.data.role);
      localStorage.setItem('customerId',response.data.customerId);
      

      if(localStorage.getItem('userRole')=="ROLE_ADMIN"){
        if(verifyAdmin){
        
        console.log("admin board")
        navigate('/admindashboard');
        notify('Loged successfully!', 'success'); 
        
      }
      else{
        navigate('/login')
      }
      }
      if(localStorage.getItem('userRole')=="ROLE_USER"){
      if(verifyUser){
        console.log("USER board")
          navigate('/userdashboard')
          notify('Loged successfully!', 'success'); 

      }
      else{
        navigate('/login')
      }
    }
      

    } catch (error) {
      console.error('Error logging in:', error);
      notify('Bad credentials!.', 'error');

    }
  };

    const verifyAdmin = async () => {
      const userId = localStorage.getItem('userId');
      const gettoken = localStorage.getItem('authToken');
      
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/verify-admin`,null, {
          params: {
            token: gettoken,
          },
        });
        
        
        return response.data; // Should return a boolean or some other verification result
      } catch (error) {
        console.error('Error verifying user:', error);
        return false;
      }
    };

    const verifyUser = async () => {
      const userId = localStorage.getItem('userId');
      const gettoken = localStorage.getItem('authToken');


      try {
        const response = await axios.get(`http://localhost:8080/api/auth/verify-user`,null, {
          params: {
            token: gettoken,
          },
        });
        return response.data; // Should return a boolean or some other verification result
      } catch (error) {
        console.error('Error verifying user:', error);
        return false;
      }
      
    };


  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">LOGIN</h1>
      <form onSubmit={handleLogin}>
        <table className="table-borderless">
          <tbody>
            <tr>
              <td>
                <label htmlFor="usernameOrEmail" className="form-label">Username or Email:</label>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password" className="form-label mt-3">Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  className="form-control form-control-lg mt-3"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-center">
                <button type="submit" className="btn btn-primary btn-lg mt-4">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;