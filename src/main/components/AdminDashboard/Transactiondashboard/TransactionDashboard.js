

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageSize from '../../sharedcomponents/PageSize';
import Pagination from '../../sharedcomponents/Pagination';
import { verifyAdmin } from '../../../services/service';
import { notify } from '../../../../utils/GlobalToast';
import './Transaction.css';

const TransactionDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [columns, setColumns] = useState([
        { key: 'id', label: 'ID' },
        { key: 'amount', label: 'Amount' },
        { key: 'transactionType', label: 'Type' },
        { key: 'date', label: 'Date' },
        { key: 'accountId', label: 'Account ID' },
    ]);
    const [searchType, setSearchType] = useState(''); // State for search type
    const [searchValue, setSearchValue] = useState(''); // State for search value

    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchTransactions = async (page, size, type = '', value = '') => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:8080/api/transactions/all', {
                params: {
                    page: page - 1, // backend might be 0-indexed
                    size: size,
                    [type]: value // add search parameters if type is provided
                },
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setTransactions(response.data.content || []); // assuming your backend paginates with 'content'
            setTotalPages(response.data.totalPages || 1); // assuming your backend sends total pages
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1); // reset to first page on page size change
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    const handleSearch = () => {
        fetchTransactions(currentPage, pageSize, searchType, searchValue);
    };

    const handleReset = () => {
        setSearchType('');
        setSearchValue('');
        fetchTransactions(currentPage, pageSize); // fetch all transactions
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('authToken');
        if (!accessToken || !verifyAdmin()) {
            navigate('/login');
            notify('Back to Dashboard!', 'success');
        }
    }, [navigate]);

    return (
        <div>
            <div className="transaction">
                <h1><u>Transactions</u></h1>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <Form inline>
                    <Form.Group controlId="searchType">
                        <Form.Label>Search By:</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={{ marginLeft: '5px' }}
                        >
                            <option value="">Select</option>
                            <option value="accountId">Account ID</option>
                            <option value="transactionId">Transaction ID</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="searchValue" style={{ marginLeft: '10px' }}>
                        <Form.Control
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Enter search value"
                        />
                    </Form.Group>
                    <Button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</Button>
                    <Button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</Button>
                </Form>
            </div>

            <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
            <Table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.key === 'date'
                                        ? new Date(transaction[col.key]).toLocaleString()
                                        : transaction[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Button onClick={handleGoBack} className="go-back-button">Go Back!</Button>
        </div>
    );
};

export default TransactionDashboard;
