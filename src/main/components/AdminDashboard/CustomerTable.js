// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Pagination from '../sharedcomponents/Pagination';
// import PageSize from '../sharedcomponents/PageSize';

// const CustomerTable = ({ customers = [], onSave }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editedCustomer, setEditedCustomer] = useState({});
//   const [editCustomerId, setEditCustomerId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     // Calculate total pages whenever customers or pageSize change
//     setTotalPages(Math.ceil(customers.length / pageSize));
//   }, [customers, pageSize]);

//   const handleEditClick = (customer) => {
//     setEditCustomerId(customer.id);
//     setEditedCustomer({ ...customer });
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log('Saving customer:', editedCustomer); // for debug purpose
//     onSave(editedCustomer);
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//   // Ensure event.target and event.target.value are defined
//   // if (event && event.target && event.target.value) {
//   //   setPageSize(Number(event.target.value));
//   //   setCurrentPage(1); // Reset to the first page when page size changes
//   // } else {
//   //   console.error('Error: event or event.target.value is undefined.');
//   // }
//   setPageSize(newPageSize);
//     setCurrentPage(1); // Reset to the first page when page size change
// };


//   // Calculate pagination values
//   const startIndex = (currentPage - 1) * pageSize;
//  const paginatedCustomers = customers.slice(startIndex, startIndex + pageSize);

//   return (
    


    
//     <div className="table-responsive">
      
//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Total Balance</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedCustomers.length > 0 ? (
//             paginatedCustomers.map(customer => (
//               <tr key={customer.id}>
//                 <td>{customer.id}</td>
//                 <td>{customer.firstName}</td>
//                 <td>{customer.lastName}</td>
//                 <td>${customer.totalBalance.toFixed(2)}</td>
//                 <td>
//                   <span
//                     className={`badge ${customer.active ? 'bg-success' : 'bg-secondary'}`}
//                   >
//                     {customer.active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEditClick(customer)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">No customers available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
      
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//         <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>

//       {/* Modal for editing customer */}
//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={editedCustomer.firstName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={editedCustomer.lastName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formTotalBalance">
//               <Form.Label>Total Balance</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalBalance"
//                 value={editedCustomer.totalBalance || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CustomerTable;

// the above code is correct working code  until 23rd aug 
// adi remaijning endpoints add chyaka mundu code 

// ================================================
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Pagination from '../sharedcomponents/Pagination';
// import PageSize from '../sharedcomponents/PageSize';

// const CustomerTable = ({
//   customers = [],
//   onSave,
//   columns = [],
//   formFields = [],
//   defaultPageSize = 10
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editedCustomer, setEditedCustomer] = useState({});
//   const [editCustomerId, setEditCustomerId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(defaultPageSize);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     setTotalPages(Math.ceil(customers.length / pageSize));
//   }, [customers, pageSize]);

//   const handleEditClick = (customer) => {
//     setEditCustomerId(customer.id);
//     setEditedCustomer({ ...customer });
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log('Saving customer:', editedCustomer); // for debug purpose
//     onSave(editedCustomer);
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setCurrentPage(1); // Reset to the first page when page size changes
//   };

//   // Calculate pagination values
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedCustomers = customers.slice(startIndex, startIndex + pageSize);

//   return (
//     <div className="table-responsive">
//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
          
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index}>{col.label}</th>
//             ))}
//             <th>Actions</th>
//             <th>ID</th>
//             <th>FirstName</th>
//             <th>LastName</th>
//             <th>TotalBalance</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedCustomers.length > 0 ? (
//             paginatedCustomers.map(customer => (
//               <tr key={customer.id}>
//                 {columns.map((col, index) => (
//                   <td key={index}>{col.render ? col.render(customer) : customer[col.field]}</td>
//                 ))}
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEditClick(customer)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length + 1} className="text-center">No customers available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//         <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>

//       {/* Modal for editing customer */}
//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {formFields.map((field, index) => (
//               <Form.Group controlId={`form${field.name}`} key={index}>
//                 <Form.Label>{field.label}</Form.Label>
//                 <Form.Control
//                   type={field.type || 'text'}
//                   name={field.name}
//                   value={editedCustomer[field.name] || ''}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             ))}
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CustomerTable;
/////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Pagination from '../sharedcomponents/Pagination';
// import PageSize from '../sharedcomponents/PageSize';

// const CustomerTable = ({ customers = [], onSave, onCreateAccount, onDeleteAccount, onDeleteCustomer, onViewAccounts,onVerifyFiles }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editedCustomer, setEditedCustomer] = useState({});
//   const [editCustomerId, setEditCustomerId] = useState(null);
//   const [showAccountsModal,setShowAccountsModal]=useState(null);
//   const [accounts,setAccounts]=useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     setTotalPages(Math.ceil(customers.length / pageSize));
//   }, [customers, pageSize]);

//   const handleEditClick = (customer) => {
//     setEditCustomerId(customer.id);
//     setEditedCustomer({ ...customer });
//     setShowModal(true);
//   };
//   const handleViewAccountsClick=(customerId)=>{
//     onViewAccounts(customerId).then((accounts)=>{
//       setAccounts(accounts);
//       setShowAccountsModal(true);
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     onSave(editedCustomer);
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setEditCustomerId(null);
//   };
//   const handleAccountsModalClose=()=>{
//     setShowAccountsModal(false);
//     setAccounts([]);
//   };

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  // const handlePageSizeChange = (newPageSize) => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  // };

//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedCustomers = customers.slice(startIndex, startIndex + pageSize);

//   return (
//     <div className="table-responsive">
//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Total Balance</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedCustomers.length > 0 ? (
//             paginatedCustomers.map(customer => (
//               <tr key={customer.id}>
//                 <td>{customer.id}</td>
//                 <td>{customer.firstName}</td>
//                 <td>{customer.lastName}</td>
//                 <td>${customer.totalBalance.toFixed(2)}</td>
//                 <td>
//                   <span
//                     className={`badge ${customer.active ? 'bg-success' : 'bg-secondary'}`}
//                   >
//                     {customer.active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEditClick(customer)}
//                   >
//                     Edit
//                   </button>
//                   <button className="btn btn-info ms-2" onClicl={()=>handleViewAccountsClick(customer.id)}>View Accounts

//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => onDeleteCustomer(customer.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">No customers available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//         <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>

//       {/* Modal for editing customer */}
//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={editedCustomer.firstName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={editedCustomer.lastName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formTotalBalance">
//               <Form.Label>Total Balance</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalBalance"
//                 value={editedCustomer.totalBalance || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* Modal for Viewing Accounts */}
//       <Modal show={showAccountsModal} onHide={handleAccountsModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {accounts.length > 0 ? (
//             <table className="table table-bordered table-striped table-hover">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Account ID</th>
//                   <th>Account Type</th>
//                   <th>Balance</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {accounts.map(account => (
//                   <tr key={account.id}>
//                     <td>{account.id}</td>
//                     <td>{account.type}</td>
//                     <td>${account.balance.toFixed(2)}</td>
//                     <td>
//                       <span
//                         className={`badge ${account.active ? 'bg-success' : 'bg-secondary'}`}
//                       >
//                         {account.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No accounts available for this customer.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleAccountsModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CustomerTable;

// ipudu paina code  view account button add aindi 
// ---------------------------------
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Pagination from '../sharedcomponents/Pagination';
// import PageSize from '../sharedcomponents/PageSize';
// import { showToastError, showToastSuccess } from '../../../utils/helpers/toast';




// const CustomerTable = ({ customers = [], onSave, onCreateAccount, onDeleteAccount, onDeleteCustomer, onViewAccounts, onVerifyFiles }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editedCustomer, setEditedCustomer] = useState({});
//   const [editCustomerId, setEditCustomerId] = useState(null);
//   const [showAccountsModal, setShowAccountsModal] = useState(false); // New state for account details modal
//   const [accounts, setAccounts] = useState([]); // State to store accounts

//   const [showCreateAccountModal, setShowCreateAccountModal] = useState(false); // New state for create account modal
//   const [newAccount, setNewAccount] = useState({ accountNumber: '', balance: '', bankId: '' }); // State to manage new account data
//   const [currentCustomerId, setCurrentCustomerId] = useState(null); // State to track which customer's account is being created
  

  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   const [searchType, setSearchType] = useState(''); // State for search type
//   const [searchValue, setSearchValue] = useState(''); // State for search value
//   const [filteredCustomers, setFilteredCustomers] = useState(customers); // State for filtered customers

//   useEffect(() => {
//     // Calculate total pages whenever filtered customers or pageSize change
//     setTotalPages(Math.ceil(filteredCustomers.length / pageSize));
//   }, [filteredCustomers, pageSize]);

//   useEffect(() => {
//     // Calculate total pages whenever customers or pageSize change
//     setTotalPages(Math.ceil(customers.length / pageSize));
//   }, [customers, pageSize]);

//   const handleCreateAccountClick = (customerId) => {
//     setCurrentCustomerId(customerId);
//     setShowCreateAccountModal(true);
//   };

//   const handleEditClick = (customer) => {
//     setEditCustomerId(customer.id);
//     setEditedCustomer({ ...customer });
//     setShowModal(true);
//   };

//   const handleViewAccountsClick = (customerId) => {
//     onViewAccounts(customerId).then((accounts) => {
//       console.log('accounts fetched is: ',accounts);
//       setAccounts(accounts);

//       setShowAccountsModal(true);
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     onSave(editedCustomer);
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setEditCustomerId(null);
//   };

//   const handleCancelCreateAccount = () => {
//     setShowCreateAccountModal(false);
//     setNewAccount({ accountNumber: '', balance: '', bankId: '' });
//     setCurrentCustomerId(null);
//   };

//   const handleAccountFormChange = (e) => {
//     const { name, value } = e.target;
//     setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
//   };

//   const handleAccountCreation = () => {
//     onCreateAccount(newAccount, currentCustomerId);
//     handleCancelCreateAccount();
//   };

//   const handleAccountsModalClose = () => {
//     setShowAccountsModal(false);
//     setAccounts([]);
//   };
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setCurrentPage(1);
//   };
  
// const handleDeleteCustomerClick=(customerId)=>{
//   console.log("Deleting customer with iD: ",customerId);
//   onDeleteCustomer(customerId);
// };

// const handleDeactivateCustomerClick = (customerId) => {
//   console.log("clickin happening")
//   onDeleteCustomer(customerId);
// };

// const handleSearch = () => {
//   if (searchType && searchValue) {
//     const filtered = customers.filter((customer) => {
//       return String(customer[searchType]).toLowerCase().includes(searchValue.toLowerCase());
//     });
//     setFilteredCustomers(filtered);
//     setCurrentPage(1); // Reset to the first page
//   }
// };



// const handleReset = () => {
//   setSearchType('');
//   setSearchValue('');
//   setFilteredCustomers(customers);
//  //setCurrentPage(1); // Reset to the first page
// };



// useEffect(() => {
//   const savedCustomers = localStorage.getItem('customers');
//   if (savedCustomers) {
//     setFilteredCustomers(JSON.parse(savedCustomers));
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem('customers', JSON.stringify(filteredCustomers));
// }, [filteredCustomers]);


//   // Calculate pagination values
//   const startIndex = (currentPage - 1) * pageSize;
//    //const paginatedCustomers = customers.slice(startIndex, startIndex + pageSize);
//   const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);


//   return (

// <div>
//        <div style={{ marginBottom: '10px' }}>
//         <label>
//           Search By:
//           <select value={searchType} onChange={(e) => setSearchType(e.target.value)} style={{ marginLeft: '5px' }}>
//             <option value="">Select</option>
//             <option value="id">ID</option>
//             <option value="firstName">First Name</option>
//             <option value="lastName">Last Name</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </label>
//         <input
//           type="text"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           placeholder="Enter search value"
//           style={{ marginLeft: '10px' }}
//         />
//         <button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>
//         <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
//       </div> 
    
//     <div className="table-responsive">
//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Total Balance</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedCustomers.length > 0 ? (
//             paginatedCustomers.map(customer => (
//               <tr key={customer.id}>
//                 <td>{customer.id}</td>
//                 <td>{customer.firstName}</td>
//                 <td>{customer.lastName}</td>
//                 <td>${customer.totalBalance.toFixed(2)}</td>
//                 <td>
//                   <span
//                     className={`badge ${customer.active ? 'bg-success' : 'bg-secondary'}`}
//                   >
//                     {customer.active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEditClick(customer)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-info ms-2"
//                     onClick={() => handleViewAccountsClick(customer.id)}
//                   >
//                     View Accounts
//                   </button>
//                   <button className="btn btn-success ms-2"
//                   onClick={()=>handleCreateAccountClick(customer.id)}>
//                     Add Account
//                   </button>
//                    <button
//                      className="btn btn-danger"
//                      onClick={() => handleDeactivateCustomerClick(customer.id)}
//                    >
//                      Delete
//                    </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">No customers available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//         <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//            onPageChange={handlePageChange}
//         />
//       </div>

//       {/* Modal for editing customer */}
//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={editedCustomer.firstName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={editedCustomer.lastName || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formTotalBalance">
//               <Form.Label>Total Balance</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalBalance"
//                 value={editedCustomer.totalBalance || ''}
//                 onChange={handleChange}
//               />
//             </Form.Group>
            
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for viewing accounts */}
//       <Modal show={showAccountsModal} onHide={handleAccountsModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {accounts.length > 0 ? (
//             <table className="table table-bordered table-striped table-hover">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Account ID</th>
//                   <th>Account Number</th>
//                   <th>Balance</th>
//                   <th>Bank ID</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {accounts.map(account => (
//                   <tr key={account.id}>
//                     <td>{account.id}</td>
//                     <td>{account.accountNumber}</td>
//                     <td>${account.balance.toFixed(2)}</td>
//                     <td>{account.bankId}</td>
//                     <td>
//                       <span
//                         className={`badge ${account.active ? 'bg-success' : 'bg-secondary'}`}
//                       >
//                         {account.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No accounts available for this customer.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleAccountsModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
// </Modal>
//          {/* Modal for Adding account to a customer */}
    
//          <Modal show={showCreateAccountModal} onHide={handleCancelCreateAccount}>
          
//         <Modal.Header closeButton>
//           <Modal.Title>Create Account</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formAccountNumber">
//               <Form.Label>Account Number</Form.Label>
//               <Form.Control type="text" name="accountNumber" value={newAccount.accountNumber} onChange={handleAccountFormChange} />
//             </Form.Group>
//             <Form.Group controlId="formBalance">
//               <Form.Label>Balance</Form.Label>
//               <Form.Control type="number" name="balance" value={newAccount.balance} onChange={handleAccountFormChange} />
//             </Form.Group>
//             <Form.Group controlId="formBankId">
//               <Form.Label>Bank ID</Form.Label>
//               <Form.Control type="text" name="bankId" value={newAccount.bankId} onChange={handleAccountFormChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancelCreateAccount}>Cancel</Button>
//           <Button variant="primary" onClick={handleAccountCreation}>Create Account</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//    </div>
//   );
// };

// export default CustomerTable;



import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Pagination from '../sharedcomponents/Pagination';
import PageSize from '../sharedcomponents/PageSize';
import { showToastError, showToastSuccess } from '../../../utils/helpers/toast';
//import { EditCustomerModal, AccountsModal, CreateAccountModal } from './Modals'; // Importing modals
import { EditCustomerModal,AccountsModal,CreateAccountModal } from './CustomerModals';
const CustomerTable = ({ customers = [], onSave, onCreateAccount, onDeleteAccount, onDeleteCustomer, onViewAccounts, onVerifyFiles }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [showAccountsModal, setShowAccountsModal] = useState(false); 
  const [accounts, setAccounts] = useState([]); 
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false); 
  const [newAccount, setNewAccount] = useState({ accountNumber: '', balance: '', bankId: '' });
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCustomers.length / pageSize));
  }, [filteredCustomers, pageSize]);

  useEffect(() => {
    setTotalPages(Math.ceil(customers.length / pageSize));
  }, [customers, pageSize]);

  const handleChange= (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditedCustomer(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditedCustomer(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateAccountClick = (customerId) => {
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
      setAccounts(accounts);
      setShowAccountsModal(true);
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedCustomer(prev => ({ ...prev, [name]: value }));
  // };

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
    onCreateAccount(newAccount, currentCustomerId);
    handleCancelCreateAccount();
  };

  const handleAccountsModalClose = () => {
    setShowAccountsModal(false);
    setAccounts([]);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleDeleteCustomerClick = (customerId) => {
    onDeleteCustomer(customerId);
  };

  const handleDeactivateCustomerClick = (customerId) => {
    onDeleteCustomer(customerId);
  };

  const handleSearch = () => {
    if (searchType && searchValue) {
      const filtered = customers.filter((customer) => {
        return String(customer[searchType]).toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredCustomers(filtered);
      setCurrentPage(1); 
    }
  };

  const handleReset = () => {
    setSearchType('');
    setSearchValue('');
    setFilteredCustomers(customers);
  };

  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    if (savedCustomers) {
      setFilteredCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(filteredCustomers));
  }, [filteredCustomers]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Search By:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)} style={{ marginLeft: '5px' }}>
            <option value="">Select</option>
            <option value="id">ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            {/* <option value="Active">Active</option>
            <option value="Inactive">Inactive</option> */}
          </select>
        </label>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter search value"
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>
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
