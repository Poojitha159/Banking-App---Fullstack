import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './main/components/Auth/Login';
import AdminDashboard from './main/components/AdminDashboard/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import { ToastContainerInit } from './utils/helpers/toast';
import Userdashboard from './main/components/UserDashboard/UserDashboard';
import GlobalToast from './utils/GlobalToast';
import GetAllCoustomers from './main/components/AdminDashboard/GetAllCustomers/GetAllCoustomers';
import BankDashboard from './main/components/AdminDashboard/BankDashboard/BankDashboard';
import TransactionDashboard from './main/components/AdminDashboard/Transactiondashboard/TransactionDashboard'; 
const App = () => {
  return (
    <>
    
    {/* //<Login/><Router> */}
    <GlobalToast/>
      <Routes>
        
      <Route path="/login" element={<Login />} />
      <Route path="/get-all-customers" element={<GetAllCoustomers/>}/>
      <Route path="/bank-dashboard" element={<BankDashboard/>}/>
      <Route path="/transaction-dashboard" element={<TransactionDashboard/>}/>
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<Userdashboard/>}/>
      
      
      {/* //<Route path="/userdashboard" element={<userdashboard/>}/> */}

         {/* <Route path="/userdashboard" element={<UserDashboard/>}/> */}
      {/* <Route path="/update-customer/:customerId" element={<CustomerUpdate />} /> */}
      {/* <Route path="/filter" element={<Filter/>}/> */}
    </Routes>
    

    <ToastContainer/>
  
  </>
    
  );
};

export default App;