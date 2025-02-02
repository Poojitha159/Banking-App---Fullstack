



import React from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const PassbookTable = ({ transactions, onDateRangeChange, totalPages, currentPage, onPageChange }) => {
 
  const handleSearch = (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
  
    console.log('search initiated with', { startDate, endDate });
  
    if (startDate && endDate) {
      // Convert to ISO format if necessary
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();
      onDateRangeChange(formattedStartDate, formattedEndDate);
    } else {
      alert('Please select both start and end date.');
    }
  };
  

  const handleReset = () => {
    onDateRangeChange(null, null);
  };

  // Sanitize content before rendering
  const sanitizeContent = (content) => DOMPurify.sanitize(content);

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" name="startDate" />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" name="endDate" />
        </Form.Group>
        <Button variant="primary" type="submit">Search</Button>
        <Button variant="secondary" onClick={handleReset} className="ms-2">Reset</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(transactions[0] || {}).map((header) => (
              <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan={Object.keys(transactions[0] || {}).length}>No transactions available</td></tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                {Object.keys(transaction).map((key) => (
                  <td key={key}>
                    {key === 'date' ? new Date(transaction[key]).toLocaleString() :
                     key === 'amount' ? `$${transaction[key]}` :
                     sanitizeContent(transaction[key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PassbookTable;
