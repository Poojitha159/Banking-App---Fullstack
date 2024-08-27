import React, { useEffect,useState } from 'react'; // For using React and useEffect hooks
import { useNavigate } from 'react-router-dom'; // For navigation
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // For data fetching and mutations
import axios from 'axios';
import { notify } from '../../../../utils/GlobalToast';
import './GetAllCustomers.css';

 import {deactivateCustomer, fetchCustomers,createAccount, deleteAccount, deleteCustomer, updateCustomer, verifyCustomerFiles } from '../../../services/service'; // Import services for mutations

import CustomerTable from '../CustomerTable';
import PageSize from '../../sharedcomponents/PageSize';
import Pagination from '../../sharedcomponents/Pagination';
//import { fetchAccountsByCustomerId,verifyAdmin } from '../../../../services/service';
import { showToastError, showToastSuccess } from '../../../../utils/helpers/toast';
// import { fetchAccountsByCustomerId,verifyAdmin } from '../../../../services/service'
//import { fetchAccountsByCustomerId, verifyAdmin } from '../../../services/service';
//import { fetchAccountsByCustomerId, verifyAdmin } from '../../../services/service';
import { fetchAccountsByCustomerId,verifyAdmin } from '../../../services/service';
const GetAllCoustomers = () => {

    const navigate = useNavigate();
    
    const queryClient = useQueryClient();
    const [filteredCustomers, setFilteredCustomers] = useState([]);

// Fetch customers
const { data: customers, error, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,

    onSuccess: (data) => {
      // Set initial data when customers are fetched successfully
      setFilteredCustomers(data);
    }
  });
 
  // Mutations
  const updateCustomerMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      showToastSuccess('Customer Updated Successfully');
    },
    onError:()=>{
      showToastError('Failed to update Customer');
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      showToastSuccess('Account Created succesfully Successfully');
    },
    onError:()=>{
      showToastError('Failed to create Account');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      showToastSuccess('Account deleted successfully');
    },
    onError:()=>{
      showToastError('Failed to delete Acoount');
    }
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: deactivateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });


  const deactivateCustomerAndAccountsMutation = useMutation({
    mutationFn: async (customerId) => {
      await axios.delete(`http://localhost:8080/api/accounts/deactivateCustomerAndAccounts/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      showToastSuccess('Customer and related Accounts are deactivated!');
    },
    onError:()=>{
      showToastError('Failed to deactivating the customer');
    }
  });

  const verifyCustomerFilesMutation = useMutation({
    mutationFn: verifyCustomerFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  

  // Handle save customer
  const handleSave = (updatedCustomer) => {
    updateCustomerMutation.mutate(updatedCustomer);
  };

  // Handle create account
  const handleCreateAccount = (accountDTO, customerId) => {
    createAccountMutation.mutate({ accountDTO, customerId });
  };

  // Handle delete account
  const handleDeleteAccount = (accountId) => {
    deleteAccountMutation.mutate(accountId);
  };

  // Handle delete customer
  const handleDeleteCustomer = (customerId) => {
    deleteCustomerMutation.mutate(customerId);
  };

  // Handle verify files
  const handleVerifyFiles = (verificationDTO) => {
    verifyCustomerFilesMutation.mutate(verificationDTO);
  };

  //Handle view Accounts
  const handleViewAccounts=(customerId) =>{
    return fetchAccountsByCustomerId(customerId);
  };

  // Handle deactivate customer and accounts
const handleDeactivateCustomerAndAccounts = (customerId) => {
  console.log("Trying to deactivate customer if ID",customerId)
  deactivateCustomerAndAccountsMutation.mutate(customerId);
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
      customers={customers}
      onSave={handleSave}
      onCreateAccount={handleCreateAccount}
      onDeleteAccount={handleDeleteAccount}
      onDeleteCustomer={handleDeactivateCustomerAndAccounts}
      onViewAccounts={handleViewAccounts}
      onVerifyFiles={handleVerifyFiles}
      
    />
    {/* <PageSize/> */}
    {/* <Pagination /> */}
  </div>
  );
};

export default GetAllCoustomers
