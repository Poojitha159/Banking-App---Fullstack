

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './BankDashboard.css'

// const BankDashboard = () => {
//     const [banks, setBanks] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetching the list of banks from the API
//         axios.get(`/api/banks/all`)
//             .then(response => {
//                 setBanks(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching banks:', error);
//             });
//     }, []);

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     const handleAddBank = () => {
//         navigate(`/add-bank`); // Navigate to the Add Bank page
//     };

//     const handleUpdateBank = (bankId) => {
//         navigate(`/update-bank/${bankId}`); // Navigate to the Update Bank page for the specific bank
//     };

//     return (
//         <div>
//             <h1>Bank Dashboard</h1>
//             <button onClick={handleGoBack} className="go-back-button">
//       Go Back!
//     </button>
//             <button onClick={handleAddBank}>Add Bank</button>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {banks.map(bank => (
//                         <tr key={bank.id}>
//                             <td>{bank.id}</td>
//                             <td>{bank.name}</td>
//                             <td>
//                                 <button onClick={() => handleUpdateBank(bank.id)}>Update</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BankDashboard;


// jvjjd

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { verifyAdmin } from '../../../services/service';
// import { notify } from '../../../../utils/GlobalToast';

// const BankDashboard = () => {
//     const navigate = useNavigate();
//   const [banks, setBanks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newBank, setNewBank] = useState({ fullName: '', abbreviation: '' });
//   const [loading, setLoading] = useState(true);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedBank, setSelectedBank] = useState(null);

//   useEffect(() => {
//     fetchBanks();
//   }, []);

//   const fetchBanks = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.get(`http://localhost:8080/api/banks/all`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       setBanks(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching banks:', error);
//       setLoading(false);
//     }
//   };

//   const handleDeleteBank = async (bankId) => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       await axios.delete(`http://localhost:8080/api/banks/${bankId}`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       fetchBanks(); // Refresh the bank list after deletion
//     } catch (error) {
//       console.error('Error deleting bank:', error);
      
//     }
//   };

//   const handleAddBank = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       await axios.post(`http://localhost:8080/api/banks`, newBank, {
//         headers: { Authorization:` Bearer ${authToken}` }
//       });
//       setShowModal(false); // Close the modal
//       fetchBanks(); // Refresh the bank list after adding
//     } catch (error) {
//       console.error('Error adding bank:', error);
//     }
//   };

//   const handleUpdateBank = async () => {
//     try {
//         const authToken = localStorage.getItem('authToken');
//         const response =await axios.put(`http://localhost:8080/api/banks/${selectedBank.id}`, selectedBank, {
//           headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' }
//         });
//         console.log('Update response:', response.data); 
//         setShowUpdateModal(false); // Close the modal
//         fetchBanks(); // Refresh the bank list after updating
//     } catch (error) {
//         console.error('Error updating bank:',  error.response || error.message);
//     }
// };

// const handleInputChange = (e) => {
//     setNewBank({ ...newBank, [e.target.name]: e.target.value });
// };

// const handleUpdateInputChange = (e) => {
//     setSelectedBank({ ...selectedBank, [e.target.name]: e.target.value });
// };

//   const handleGoBack = () => {
//     navigate(-1); // Goes back to the previous page
    
//   };

//   useEffect(() => {
//     const accessToken = localStorage.getItem("authToken");
//     if (!accessToken || !verifyAdmin()) {
//       navigate("/login");
      
//     }
//   }, [navigate]);

//   return (
//     <div className="container mt-5">
      
//       <h1><u>Bank Dashboard</u></h1>
//       <div className="d-flex justify-content-between mb-3">
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           Add Bank
//         </Button>
//         <Button onClick={handleGoBack} className="go-back-button">
//           Go Back!
//         </Button>
//       </div>
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Table className="table table-bordered table-striped table-hover">
//           <thead className="table-dark">
         
//             <tr>
//               <th>ID</th>
//               <th>Full Name</th>
//               <th>Abbreviation</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {banks.map((bank) => (
//               <tr key={bank.id}>
//                 <td>{bank.id}</td>
//                 <td>{bank.fullName}</td>
//                 <td>{bank.abbreviation}</td>
//                 <td>
//                                     <Button
//                                         variant="info"
//                                         className="me-2"
//                                         onClick={() => {
//                                             setSelectedBank(bank);
//                                             setShowUpdateModal(true);
//                                         }}
//                                     >
//                                         Update
//                                     </Button>
                                    
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDeleteBank(bank.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Add Bank Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Bank</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFullName">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter full name"
//                 name="fullName"
//                 value={newBank.fullName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formAbbreviation" className="mt-3">
//               <Form.Label>Abbreviation</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter abbreviation"
//                 name="abbreviation"
//                 value={newBank.abbreviation}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddBank}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

// {/* Update Bank Modal */}
// <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Bank</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedBank && (
//                         <Form>
//                             <Form.Group controlId="formFullName">
//                                 <Form.Label>Full Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter full name"
//                                     name="fullName"
//                                     value={selectedBank.fullName}
//                                     onChange={handleUpdateInputChange}
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formAbbreviation" className="mt-3">
//                                 <Form.Label>Abbreviation</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter abbreviation"
//                                     name="abbreviation"
//                                     value={selectedBank.abbreviation}
//                                     onChange={handleUpdateInputChange}
//                                 />
//                             </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleUpdateBank}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//     </div>
//   );
// };

// export default BankDashboard;
///hgjgjg


import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { verifyAdmin ,fetchBanks, deleteBank, addBank, updateBank } from '../../../services/service';
import { notify } from '../../../../utils/GlobalToast';
import './BankDashboard.css'
import { AddBankModal ,UpdateBankModal} from './BankModal';

const BankDashboard = () => {
    const navigate = useNavigate();
    const [banks, setBanks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBank, setNewBank] = useState({ fullName: '', abbreviation: '' });
    const [loading, setLoading] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

   // Define the columns dynamically
   const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'abbreviation', label: 'Abbreviation' },
    { key: 'actions', label: 'Actions' }
];

useEffect(() => {
    const loadBanks = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            const data = await fetchBanks(authToken);
            setBanks(data);
        } catch (error) {
            console.error('Error fetching banks:', error);
        } finally {
            setLoading(false);
        }
    };
    loadBanks();
}, []);

const handleDeleteBank = async (bankId) => {
    try {
        const authToken = localStorage.getItem('authToken');
        await deleteBank(bankId, authToken);
        const data = await fetchBanks(authToken);
        setBanks(data); // Refresh the bank list after deletion
    } catch (error) {
        console.error('Error deleting bank:', error);
    }
};

const handleAddBank = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        await addBank(newBank, authToken);
        setShowModal(false); // Close the modal
        const data = await fetchBanks(authToken); // Refresh the bank list after adding
        setBanks(data);
    } catch (error) {
        console.error('Error adding bank:', error);
    }
};

const handleUpdateBank = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        await updateBank(selectedBank.id, selectedBank, authToken);
        setShowUpdateModal(false); // Close the modal
        const data = await fetchBanks(authToken); // Refresh the bank list after updating
        setBanks(data);
    } catch (error) {
        console.error('Error updating bank:', error);
    }
};

    const handleInputChange = (e) => {
        setNewBank({ ...newBank, [e.target.name]: e.target.value });
    };

    const handleUpdateInputChange = (e) => {
        setSelectedBank({ ...selectedBank, [e.target.name]: e.target.value });
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("authToken");
        if (!accessToken || !verifyAdmin()) {
            navigate("/login");
            notify('Back to Dashboard!', 'success'); 
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
          <div className="bank"> 
            <h1><u>Bank Dashboard</u></h1>
            </div>
           
            <div className="d-flex justify-content-between mb-3">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Bank
                </Button>
                <Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button>
            </div>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {banks.map((bank) => (
                            <tr key={bank.id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key === 'actions' ? (
                                            <>
                                                <Button
                                                    variant="info"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setSelectedBank(bank);
                                                        setShowUpdateModal(true);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteBank(bank.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        ) : (
                                            bank[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Add Bank Modal */}
            <AddBankModal
                show={showModal}
                onHide={() => setShowModal(false)}
                newBank={newBank}
                handleInputChange={handleInputChange}
                handleAddBank={handleAddBank}
            />

            {/* Update Bank Modal */}
            <UpdateBankModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                selectedBank={selectedBank}
                handleUpdateInputChange={handleUpdateInputChange}
                handleUpdateBank={handleUpdateBank}
            />
        </div>
    );
};

export default BankDashboard;
