
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { verifyAdmin ,fetchBanks, deleteBank, addBank, updateBank } from '../../../services/service';
import { notify } from '../../../../utils/Helpers/GlobalToast';
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
        setShowModal(false); 
        const data = await fetchBanks(authToken); 
        setBanks(data);
    } catch (error) {
        console.error('Error adding bank:', error);
    }
};

const handleUpdateBank = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        await updateBank(selectedBank.id, selectedBank, authToken);
        setShowUpdateModal(false); 
        const data = await fetchBanks(authToken); 
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
