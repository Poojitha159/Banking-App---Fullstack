

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Pagination from '../SharedComponents/Pagination';
import PageSize from '../SharedComponents/PageSize';
import { showToastError, showToastSuccess } from '../../../utils/Helpers/Toast';
import { EditCustomerModal, AccountsModal, CreateAccountModal } from './CustomerModals';
import { notify } from '../../../utils/Helpers/GlobalToast';

const CustomerTable = ({ customers = [], onSave, onCreateAccount, onDeleteAccount, onDeleteCustomer, onViewAccounts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [showAccountsModal, setShowAccountsModal] = useState(false); 
  const [accounts, setAccounts] = useState([]); 
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false); 
  const [newAccount, setNewAccount] = useState({ accountNumber: '', balance: '', bankId: '' });
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10', 10));
  const [totalPages, setTotalPages] = useState(0);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchType, setSearchType] = useState(searchParams.get('searchType') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('searchValue') || '');

  useEffect(() => {
    // Update filtered customers based on searchType and searchValue
    if (searchType && searchValue) {
      const filtered = customers.filter((customer) => {
        return String(customer[searchType]).toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchType, searchValue, customers]);

  useEffect(() => {
    // Update total pages whenever filteredCustomers or pageSize changes
    setTotalPages(Math.ceil(filteredCustomers.length / pageSize));
  }, [filteredCustomers, pageSize]);

  useEffect(() => {
    // Update URL search params based on state changes
    setSearchParams({
      searchType,
      searchValue,
      page: currentPage,
      pageSize,
    });
  }, [searchType, searchValue, currentPage, pageSize]);

  const handleSearch = () => {
    setSearchParams({
      searchType,
      searchValue,
      page: 1, // Reset to first page on search
      pageSize,
    });
    setCurrentPage(1); // Reset to first page on search
  };

  const handleReset = () => {
    setSearchParams({
      page: 1,
      pageSize,
    });
    setSearchType('');
    setSearchValue('');
    setFilteredCustomers(customers);
    setCurrentPage(1);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditedCustomer(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditedCustomer(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateAccountClick = (customerId) => {
    console.log('selecting customer is',customerId);
    setCurrentCustomerId(customerId);
    setShowCreateAccountModal(true);
  };

  const handleEditClick = (customer) => {
    setEditCustomerId(customer.id);
    setEditedCustomer({ ...customer });
    setShowModal(true);
  };

  const handleViewAccountsClick = (customerId) => {
    onViewAccounts(customerId).then((accounts) => {
      console.log('Accounts fetched:', accounts); // Debug: Check accounts data
      setAccounts(accounts);
      setShowAccountsModal(true);
    }).catch(err => {
      console.error('Failed to fetch accounts:', err);
      setAccounts([]); // Ensure accounts state is reset on error
      setShowAccountsModal(true);
    });
  };

  const handleSave = () => {
    onSave(editedCustomer);
    setShowModal(false);
    setEditCustomerId(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditCustomerId(null);
  };

  const handleCancelCreateAccount = () => {
    setShowCreateAccountModal(false);
    setNewAccount({ accountNumber: '', balance: '', bankId: '' });
    setCurrentCustomerId(null);
  };

  const handleAccountFormChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  
  const handleAccountCreation = () => {
    if (!newAccount.accountNumber || !newAccount.balance || !newAccount.bankId) {
      notify('All fields are required','error');
      return;
    }
    onCreateAccount(newAccount, currentCustomerId)
      .then(() => {
        handleCancelCreateAccount();
        notify('Account Created Successfully','success');
      })
      .catch(err => {
       notify('Failed to create Account','error');
        console.error(err);
      });
  };

  const handleAccountsModalClose = () => {
    setShowAccountsModal(false);
    setAccounts([]);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({
      searchType,
      searchValue,
      page: newPage,
      pageSize,
    });
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
    setSearchParams({
      searchType,
      searchValue,
      page: 1,
      pageSize: newPageSize,
    });
  };

  const handleDeleteCustomerClick = (customerId) => {
    onDeleteCustomer(customerId);
  };

  const handleDeactivateCustomerClick = (customerId) => {
    onDeleteCustomer(customerId);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Search By:
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{ marginLeft: '5px' }}
          >
            <option value="">Select</option>
            <option value="id">ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </label>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter search value"
          style={{ marginLeft: '10px' }}
        />
        {/* <button onClick={handleSearchButtonClick} style={{ marginLeft: '10px' }}>Search</button> */}
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>${customer.totalBalance.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${customer.active ? 'bg-success' : 'bg-secondary'}`}>
                      {customer.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => handleViewAccountsClick(customer.id)}
                    >
                      View Accounts
                    </button>
                    <button
                      className="btn btn-success ms-2"
                      onClick={() => handleCreateAccountClick(customer.id)}
                    >
                      Add Account
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeactivateCustomerClick(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No customers available.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <EditCustomerModal
          show={showModal}
          onHide={handleCancel}
          editedCustomer={editedCustomer}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />

        <AccountsModal
          show={showAccountsModal}
          onHide={handleAccountsModalClose}
          accounts={accounts}
        />

        <CreateAccountModal
          show={showCreateAccountModal}
          onHide={handleCancelCreateAccount}
          newAccount={newAccount}
          handleAccountFormChange={handleAccountFormChange}
          handleAccountCreation={handleAccountCreation}
          handleCancel={handleCancelCreateAccount}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
