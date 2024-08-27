// import { useNavigate } from 'react-router-dom';

// export const useAuth = (re) => {
//   const navigate = useNavigate();
  
//   const isAuthenticated = () => {
//     return localStorage.getItem('authToken') !== null;
//   };
  
//   const checkAuth = () => {
//     if (!isAuthenticated()) {
//       navigate('/login');
//     }
//   };
  
//   return { isAuthenticated, checkAuth };
// };

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = (requiredRole) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (!token) {
      // No token means not logged in
      navigate('/login');
    } else if (requiredRole && role !== requiredRole) {
      // Check for specific roles if needed
      navigate('/login');
    }
  }, [navigate, requiredRole]);
};

export default useAuth;
