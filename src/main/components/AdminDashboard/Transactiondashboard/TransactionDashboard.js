

import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageSize from '../../SharedComponents/PageSize';
import Pagination from '../../SharedComponents/Pagination';
import { fetchTransactions,verifyAdmin } from '../../../services/service'; // Import the function
import { notify } from '../../../../utils/Helpers/GlobalToast';
import './Transaction.css';

const TransactionDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [columns, setColumns] = useState([
        { key: 'id', label: 'ID' },
        { key: 'amount', label: 'Amount' },
        { key: 'transactionType', label: 'Type' },
        { key: 'date', label: 'Date' },
        { key: 'accountId', label: 'Account ID' },
    ]);
    const [isSearching, setIsSearching] = useState(false); 

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageSize = parseInt(searchParams.get('pageSize')) || 10;
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const searchType = searchParams.get('searchType') || '';
    const searchValue = searchParams.get('searchValue') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    useEffect(() => {
        fetchTransactionsData();
    }, [searchParams]);

    const fetchTransactionsData = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            const data = await fetchTransactions(currentPage, pageSize, searchType, searchValue, startDate, endDate, authToken);
            console.log('full api response:', data);

            if (searchType === 'transactionId') {
                setTransactions(data ? [data] : []); // Wrap single transaction in an array
                setIsSearching(true);
                setTotalPages(1); // No pagination for single transaction
            } else if (searchType === 'dateRange') {
                setTransactions(data.content || []); // Ensure data is paginated
                setTotalPages(data.totalPages || 1);
                setIsSearching(true);
                return data;
            } else {
                setTransactions(data.content || []);
                setTotalPages(data.totalPages || 1);
                setIsSearching(false);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const updateSearchParams = (params) => {
        setSearchParams({ ...Object.fromEntries([...searchParams]), ...params });
    };

    const handlePageChange = (page) => {
        updateSearchParams({ page });
    };

    const handlePageSizeChange = (size) => {
        updateSearchParams({ pageSize: size, page: 1 }); // Reset to first page on page size change
    };

    const handleSearch = () => {
        updateSearchParams({ page: 1, searchType, searchValue, startDate, endDate });
    };

    const handleReset = () => {
        setSearchParams({ pageSize: pageSize, page: 1 });
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('authToken');
        if (!accessToken || !verifyAdmin(accessToken)) {
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
                            onChange={(e) => updateSearchParams({ searchType: e.target.value })}
                            style={{ marginLeft: '5px' }}
                        >
                            <option value="">Select</option>
                            <option value="transactionId">Transaction ID</option>
                            <option value="dateRange">Date Range</option>
                        </Form.Control>
                    </Form.Group>

                    {searchType === 'transactionId' && (
                        <Form.Group controlId="searchValue" style={{ marginLeft: '10px' }}>
                            <Form.Control
                                type="text"
                                value={searchValue}
                                onChange={(e) => updateSearchParams({ searchValue: e.target.value })}
                                placeholder="Enter search value"
                            />
                        </Form.Group>
                    )}

                    {searchType === 'dateRange' && (
                        <>
                            <Form.Group controlId="startDate" style={{ marginLeft: '10px' }}>
                                <Form.Label>Start Date:</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => updateSearchParams({ startDate: e.target.value })}
                                    placeholder="Enter start date"
                                />
                            </Form.Group>
                            <Form.Group controlId="endDate" style={{ marginLeft: '10px' }}>
                                <Form.Label>End Date:</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => updateSearchParams({ endDate: e.target.value })}
                                    placeholder="Enter end date"
                                />
                            </Form.Group>
                        </>
                    )}

                    <Button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</Button>
                    <Button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</Button>
                </Form>
            </div>

            <Table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(transactions) && transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key === 'date'
                                            ? new Date(transaction[col.key]).toLocaleString()
                                            : transaction[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                {!isSearching && <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />}
                {!isSearching && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <Button onClick={() => navigate(-1)} className="go-back-button">Go Back!</Button>
        </div>
    );
};

export default TransactionDashboard;
