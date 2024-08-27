// import React, { useState } from 'react';

  import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

    
export const DepositModal = ({ show, onHide, accountNumbers, selectedAccountId, setSelectedAccountId }) => {
    const [amount, setAmount] = useState('');
   // const accountId = String(selectedAccountId);
   const [accountId, setAccountId] = useState(selectedAccountId);

   console.log(selectedAccountId);

   useEffect(() => {
    setAccountId(selectedAccountId);
  }, [selectedAccountId]);

    
    const handleDeposit = async () => {
        if (!accountId || !amount) {
          toast.error('Please select an account and enter an amount.');
          return;
        }
        try {
           await axios.post(
            `http://localhost:8080/api/customers/${accountId}/deposit`,
            null,
            { params:{amount},
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('authToken')}` } }          );
          toast.success('Deposit successful!');
          onHide();
        } catch (error) {
          console.error('Deposit failed:', error);
          toast.error('Deposit failed. Please try again.');
        }
      };
    
  
    return (
           
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="account">
            <Form.Label>Account</Form.Label>
            <Form.Control
              as="select"
              value={accountId || ''}
              onChange={(e) => setAccountId(e.target.value)}
            >
              <option value="">Select an account</option>
              {accountNumbers.map(account => (
                <option key={account.accountId} value={account.accountId}>
                  {account.accountNumber}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeposit}>
          Deposit
        </Button>
      </Modal.Footer>
    </Modal>
    );
  };
  
  export const WithdrawModal = ({ show, onHide, accountNumbers, selectedAccountId, setSelectedAccountId }) => {
    const [amount, setAmount] = useState('');
   // const accountId = String(selectedAccountId);
   const [accountId, setAccountId] = useState(selectedAccountId);

   console.log(selectedAccountId);

   useEffect(() => {
    setAccountId(selectedAccountId);
  }, [selectedAccountId]);
  
  const handleWithdraw = async () => {
    if (!accountId || !amount) {
      toast.error('Please select an account and enter an amount.');
      return;
    }
    try {
       await axios.post(
        `http://localhost:8080/api/customers/${accountId}/withdraw`,
        null,
        { params:{amount},
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('authToken')}` } }          );
      toast.success('Withdraw Successful!');
      onHide();
    } catch (error) {
      console.error('Withdraw failed:', error);
      toast.error('Withdraw failed. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Withdraw</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="account">
            <Form.Label>Account</Form.Label>
            <Form.Control
              as="select"
              value={accountId || ''}
              onChange={(e) => setAccountId(e.target.value)}
            >
              <option value="">Select an account</option>
              {accountNumbers.map(account => (
                <option key={account.accountId} value={account.accountId}>
                  {account.accountNumber}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </Modal.Footer>
    </Modal>
    );
  };



  export const TransferModal = ({ show, onHide, accountNumbers, selectedAccountId, setSelectedAccountId }) => {
    const [amount, setAmount] = useState('');
    const [toAccountId, setToAccountId] = useState('');
    const [fromAccountId, setFromAccountId] = useState(selectedAccountId);
  
    useEffect(() => {
      setFromAccountId(selectedAccountId);
    }, [selectedAccountId]);
  
    const handleTransfer = async () => {
      if (!fromAccountId || !toAccountId || !amount) {
        toast.error('Please fill all fields.');
        return;
      }
      try {
        await axios.post(
          `http://localhost:8080/api/customers/${fromAccountId}/transfer/${toAccountId}`,
          null, // No request body
          {
            params: { amount }, // Amount as query parameter
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          }
        );
        toast.success('Transfer successful!');
        onHide();
      } catch (error) {
        console.error('Transfer failed:', error);
        toast.error('Transfer failed. Please try again.');
      }
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fromAccount">
              <Form.Label>From Account</Form.Label>
              <Form.Control
                as="select"
                value={fromAccountId || ''}
                onChange={(e) => setFromAccountId(e.target.value)}
              >
                <option value="">Select your account</option>
                {accountNumbers.map(account => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountNumber}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="toAccount">
              <Form.Label>To Account</Form.Label>
              <Form.Control
                type="text"
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                placeholder="Enter recipient account ID"
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransfer}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  