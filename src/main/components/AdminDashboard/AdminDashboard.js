
import React  from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; 
import { verifyAdmin } from '../../services/service';
// import { notify } from '../../../utils/GlobalToast';
import { notify } from '../../../utils/Helpers/GlobalToast';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigateToCustomers = () => {
        navigate('/get-all-customers'); 
        
        
    };

    const handleNavigateToBankDashboard = () => {
        console.log('bank related');
        navigate('/bank-dashboard'); 
       
    };

    const handleNavigateToTransactionDashboard = () => {
        navigate('/transaction-dashboard'); 
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
      
    };

    const handleLogout = () => {
          localStorage.removeItem("authToken");
           navigate("/login");
           notify('Back to LoginBoard!', 'success'); 
         };

         useEffect(() => {
            const accessToken = localStorage.getItem("authToken");
            if (!accessToken || !verifyAdmin()) {
              navigate("/login");
            }
          }, [navigate]);
    return (
        <div className="admin-dashboard">
            <h1><u>Admin Dashboard</u></h1>
            <br/>
            <br/>
            <br/>
            {/* <button onClick={handleGoBack} className="go-back-button">Go Back</button> */}
            <button onClick={handleLogout} className="go-back-button ">
         Logout
       </button>
            <div className="card-container">
                <div className="card" onClick={handleNavigateToCustomers}>
                    <h2>Customer Management</h2>
                    <p>Manage and view all customers</p>
                </div>
                <div className="card" onClick={handleNavigateToBankDashboard}>
                    <h2>Bank Dashboard</h2>
                    <p>Overview of the bank's </p>
                </div>
                <div className="card" onClick={handleNavigateToTransactionDashboard}>
                    <h2>Transaction Dashboard</h2>
                    <p>View The Transactions</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;




