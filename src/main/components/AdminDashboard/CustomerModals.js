import React,{useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleValidationError } from '../../../utils/Errors/HandleApiError';

export const EditCustomerModal = ({ show, onHide, editedCustomer, handleChange, handleSave, handleCancel }) => {
  const activeStatus = () => {
    handleChange({ target: { name: 'active', value: !editedCustomer.active } });
  };
  return(
  <Modal show={show} onHide={handleCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Customer</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={editedCustomer.firstName || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={editedCustomer.lastName || ''}
            onChange={handleChange}
          />
        </Form.Group>
        

        <Form.Group controlId="formActive">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={editedCustomer.active ? 'Active' : 'Inactive'}
              checked={editedCustomer.active}
              onChange={activeStatus}
            />
          </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
)
};

// export const AccountsModal = ({ show, onHide, accounts }) => (
//   <Modal show={show} onHide={onHide}>
//     <Modal.Header closeButton>
//       <Modal.Title>Account Details</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       {accounts.length > 0 ? (
//         <table className="table table-bordered table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Account ID</th>
//               <th>Account Number</th>
//               <th>Balance</th>
//               <th>Bank ID</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accounts.map(account => (
//               <tr key={account.id}>
//                 <td>{account.id}</td>
//                 <td>{account.accountNumber}</td>
//                 <td>${account.balance.toFixed(2)}</td>
//                 <td>{account.bankId}</td>
//                 <td>
//                   <span
//                     className={`badge ${account.active ? 'bg-success' : 'bg-secondary'}`}
//                   >
//                     {account.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No accounts available for this customer.</p>
//       )}
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={onHide}>
//         Close
//       </Button>
//     </Modal.Footer>
//   </Modal>
// );

// export const CreateAccountModal = ({ show, onHide, newAccount, handleAccountFormChange, handleAccountCreation, handleCancel }) => (
//   <Modal show={show} onHide={handleCancel}>
//     <Modal.Header closeButton>
//       <Modal.Title>Create Account</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form>
//         <Form.Group controlId="formAccountNumber">
//           <Form.Label>Account Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="accountNumber"
//             value={newAccount.accountNumber}
//             onChange={handleAccountFormChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBalance">
//           <Form.Label>Balance</Form.Label>
//           <Form.Control
//             type="number"
//             name="balance"
//             value={newAccount.balance}
//             onChange={handleAccountFormChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBankId">
//           <Form.Label>Bank ID</Form.Label>
//           <Form.Control
//             type="text"
//             name="bankId"
//             value={newAccount.bankId}
//             onChange={handleAccountFormChange}
//           />
//         </Form.Group>
//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
//       <Button variant="primary" onClick={handleAccountCreation}>Create Account</Button>
//     </Modal.Footer>
//   </Modal>
// );


export const CreateAccountModal = ({ show, onHide, newAccount, handleAccountFormChange, handleAccountCreation, handleCancel }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check form validity
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true); // Show validation feedback
      return;
    }

    // If form is valid, invoke account creation handler
    handleAccountCreation();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formAccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              name="accountNumber"
              value={newAccount.accountNumber}
              onChange={handleAccountFormChange}
              required
              isInvalid={!newAccount.accountNumber && validated}
            />
            <Form.Control.Feedback type="invalid">
              Account Number is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBalance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              value={newAccount.balance}
              onChange={handleAccountFormChange}
              required
              isInvalid={(newAccount.balance === '' || newAccount.balance <= 0) && validated}
            />
            <Form.Control.Feedback type="invalid">
              A valid Balance is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBankId">
            <Form.Label>Bank ID</Form.Label>
            <Form.Control
              type="text"
              name="bankId"
              value={newAccount.bankId}
              onChange={handleAccountFormChange}
              required
              isInvalid={!newAccount.bankId && validated}
            />
            <Form.Control.Feedback type="invalid">
              Bank ID is required.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" type="submit">Create Account</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export const AccountsModal = ({ show, onHide, accounts }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Account Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {accounts && accounts.length > 0 ? (
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Account ID</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Bank ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.accountNumber}</td>
                <td>${account.balance.toFixed(2)}</td>
                <td>{account.bankId}</td>
                <td>
                  <span
                    className={`badge ${account.isActive ? 'bg-success' : 'bg-secondary'}`}
                  >
                    {account.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No accounts available for this customer.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);