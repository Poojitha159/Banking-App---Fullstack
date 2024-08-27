

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DepositModal, WithdrawModal, TransferModal } from '../Modals/Modal';
import PassbookTable from './PassbookTable';
import './Userdashboard.css';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../services/service';
import { notify } from '../../../utils/GlobalToast';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPassbook, setShowPassbook] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [accountBalances, setAccountBalances] = useState({});


  const customerId = localStorage.getItem('customerId');
  const authToken = localStorage.getItem('authToken');


  useEffect(() => {
    const fetchAccountBalances = async () => {
      if (accountNumbers.length > 0) {
        const balances = {};
        for (const account of accountNumbers) {
          try {
            const response = await axios.get(`http://localhost:8080/api/accounts/${account.accountId}/balance`, {
              headers: { Authorization: `Bearer ${authToken}` }
            });
            balances[account.accountId] = response.data;
          } catch (error) {
            console.error(`Error fetching balance for account ${account.accountId}:`, error);
          }
        }
        setAccountBalances(balances);
      }
    };
  
    fetchAccountBalances();
  }, [accountNumbers, authToken]);
  
 

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/customers/${customerId}/totalBalance`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setTotalBalance(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const customerResponse = await axios.get(`http://localhost:8080/api/customers/${customerId}/details`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setCustomerDetails(customerResponse.data);

        const accountResponse = await axios.get(`http://localhost:8080/api/customers/${customerId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setAccountNumbers(accountResponse.data);
        console.log(accountResponse)
        if (accountResponse.data.length > 0) {
          setSelectedAccountId(accountResponse.data[0].accountId);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to fetch customer data.');
      }
    };

    fetchCustomerDetails();
    fetchCustomerData();
  }, [customerId, authToken]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!showPassbook) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/customers/${customerId}/passbook`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setTransactions(response.data.content);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [showPassbook, customerId, authToken]);

  


  const handleModalOpen = (type) => {
    if (type === 'deposit') setShowDepositModal(true);
    if (type === 'withdraw') setShowWithdrawModal(true);
    if (type === 'transfer') setShowTransferModal(true);
    if (type === 'passbook') setShowPassbook(!showPassbook);
  };

  const handleModalClose = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowTransferModal(false);
    setShowPassbook(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    notify('Back to LoginBoard!', 'success');
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start || '');
    setEndDate(end || '');
    setCurrentPage(1); // Reset to the first page when date range changes
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('authToken');
    if (!accessToken || !verifyUser()) {
      navigate('/login');
    }
  }, [navigate]);

 

  return (
    <Container>
      <div className="user-dashboard">
        <h1><u>User Dashboard</u></h1>
      </div>
      {customerDetails && (
        <div>
          <h2>Welcome, {customerDetails.firstName} {customerDetails.lastName}</h2>
          <h3>Total Balance: ${totalBalance.toFixed(2)}</h3>
        </div>
      )}
      <h2>Your Accounts</h2>
      <ul>
        {accountNumbers.map((account) => (
          <li key={account.accountId}>Account Number: {account.accountNumber}, Account ID: {account.accountId},
          Balance: ${accountBalances[account.accountId]?.toFixed(2) || 'Loading...'}
          </li>
        ))}
      </ul>

      <Row>
        <Col>
          <Card onClick={() => handleModalOpen('deposit')} className="action-card">
            <Card.Body>
              <Card.Title>Deposit</Card.Title>
              <Card.Text>Click here to make a deposit.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handleModalOpen('withdraw')} className="action-card">
            <Card.Body>
              <Card.Title>Withdraw</Card.Title>
              <Card.Text>Click here to withdraw funds.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handleModalOpen('transfer')} className="action-card">
            <Card.Body>
              <Card.Title>Transfer</Card.Title>
              <Card.Text>Click here to transfer funds.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handleModalOpen('passbook')} className="action-card">
            <Card.Body>
              <Card.Title>Passbook</Card.Title>
              <Card.Text>Click here to view your transactions.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button onClick={handleLogout} className="go-back-button">Logout</Button>

      <ToastContainer />

      <DepositModal
        show={showDepositModal}
        onHide={handleModalClose}
        accountNumbers={accountNumbers}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />

      <WithdrawModal
        show={showWithdrawModal}
        onHide={handleModalClose}
        accountNumbers={accountNumbers}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />

      <TransferModal
        show={showTransferModal}
        onHide={handleModalClose}
        accountNumbers={accountNumbers}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />

      {showPassbook && (
        <PassbookTable
          transactions={transactions}
          onDateRangeChange={handleDateRangeChange}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default UserDashboard;
