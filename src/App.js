import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './main/components/Auth/Login';
import AdminDashboard from './main/components/AdminDashboard/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import { ToastContainerInit } from './utils/Helpers/Toast';
import Userdashboard from './main/components/UserDashboard/UserDashboard';
import GlobalToast from './utils/GlobalToast';
import GetAllCoustomers from './main/components/AdminDashboard/GetAllCustomers/GetAllCoustomers';
import BankDashboard from './main/components/AdminDashboard/BankDashboard/BankDashboard';
// import TransactionDashboard from './main/components/AdminDashboard/Transactiondashboard/TransactionDashboard'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './main/components/Auth/RegistrationForm';
// import TransactionDashboard from './main/components/AdminDashboard/Transactiondashboard/TransactionDashboard';
import TransactionDashboard from './main/components/AdminDashboard/TransactionDashboard/TransactionDashboard';
const App = () => {
  return (
    <>
    
    {/* //<Login/><Router> */}
    <GlobalToast/>
      <Routes>
        
        
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<RegistrationForm/>}/>
      <Route path="/get-all-customers" element={<GetAllCoustomers/>}/>
      <Route path="/bank-dashboard" element={<BankDashboard/>}/>
      <Route path="/transaction-dashboard" element={<TransactionDashboard/>}/>
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<Userdashboard/>}/>
      
      
      
    </Routes>
    

    <ToastContainer/>
  
  </>
    
  );
};

export default App;