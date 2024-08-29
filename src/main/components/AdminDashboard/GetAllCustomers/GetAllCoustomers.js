
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import { notify } from '../../../../utils/GlobalToast';
import './GetAllCustomers.css';

import CustomerTable from '../CustomerTable';
import PageSize from '../../SharedComponents/PageSize';
import Pagination from '../../SharedComponents/Pagination';


import { 
  fetchCustomers, 
  createAccount, 
  deleteAccount, 
  deleteCustomer, 
  updateCustomer, 
  fetchAccountsByCustomerId, 
  deactivateCustomer, 
  verifyAdmin 
} from '../../../services/service';

const GetAllCoustomers = () => {
  const navigate = useNavigate();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customers
  useEffect(() => {
    const fetchAllCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setFilteredCustomers(data);
        setError(null);
      } catch (err) {
        setError('Error fetching customers');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCustomers();
  }, []);

  // Handle save customer
  const handleSave = async (updatedCustomer) => {
    try {
      await updateCustomer(updatedCustomer);
      setFilteredCustomers((prev) => 
        prev.map((customer) => 
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
      
    } catch (err) {
      notify('failed to update','error');
      console.error(err);
    }
  };

  // Handle create account
  const handleCreateAccount = async (accountDTO, customerId) => {
    try {
      await createAccount({ accountDTO, customerId });
      notify('Account created succesfully','success')
      
        } catch (err) {

      notify('Failed to create Account','error')
      console.error(err);
    }
  };
 


  // Handle delete account
  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(accountId);
      //showToastSuccess('Account Deleted Successfully');
    } catch (err) {
      console.error(err);
    }
  };

  
  // Handle deactivate customer and accounts
  const handleDeactivateCustomerAndAccounts = async (customerId) => {
    try {
      await deactivateCustomer(customerId);
      // setFilteredCustomers((prev) => 
      //   prev.filter((customer) => customer.id !== customerId)
      // );
      setFilteredCustomers((prev) => 
        prev.map((customer) => 
          customer.id === customerId ? { ...customer, active: false } : customer
        )
      );
       notify('Customer and related Accounts are deactivated!', 'success');
    } catch (err) {
      notify('Failed to deactivate Customer and Accounts', 'error');
      console.error(err);
      
    }
  };

  // Handle view accounts
  const handleViewAccounts = async (customerId) => {
    try {
      const accounts = await fetchAccountsByCustomerId(customerId);
      console.log(accounts);
      return accounts;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    if (!accessToken || !verifyAdmin()) {
      navigate("/login");
      notify('Back to Dashboard!', 'success'); 
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };

 
  
  return (
    <div>
      <div className="getallcustomers">
        <h1><u>All Customers</u></h1>
      </div>
    
      <button onClick={handleGoBack} className="go-back-button">
        Go Back!
      </button>
      <CustomerTable
        customers={filteredCustomers}
        onSave={handleSave}
        onCreateAccount={handleCreateAccount}
        onDeleteAccount={handleDeleteAccount}
        onDeleteCustomer={handleDeactivateCustomerAndAccounts}
        onViewAccounts={handleViewAccounts}
      />
      {/* <PageSize/> */}
      {/* <Pagination /> */}
    </div>
  );
};

export default GetAllCoustomers;