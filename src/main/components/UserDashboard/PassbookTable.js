


//////// executable code is from 
// import React from 'react';
// import { Table } from 'react-bootstrap';

// const PassbookTable = ({ transactions }) => {
//   if (!transactions || transactions.length === 0) {
//     return <p>No transactions available.</p>;
//   }

//   // Extract column headers from the keys of the first transaction object
//   const headers = Object.keys(transactions[0]);

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {transactions.map((transaction) => (
//           <tr key={transaction.id}>
//             {headers.map((header) => (
//               <td key={header}>
//                 {/* Format the date if the column is 'date' */}
//                 {header === 'date' ? new Date(transaction[header]).toLocaleString() :
//                  header === 'amount' ? `$${transaction[header]}` :
//                  transaction[header]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default PassbookTable;

// to here 
//----------------------
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Form, Pagination } from 'react-bootstrap';
// import axios from 'axios';

// const PassbookTable = ({ transactions, onDateRangeChange, totalPages, currentPage, onPageChange }) => {
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const startDate = e.target.startDate.value;
//     const endDate = e.target.endDate.value;
//     onDateRangeChange(startDate, endDate);
//   };

//   const handleReset = () => {
//     onDateRangeChange(null, null);
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSearch}>
//         <Form.Group controlId="startDate">
//           <Form.Label>Start Date</Form.Label>
//           <Form.Control type="date" name="startDate" />
//         </Form.Group>
//         <Form.Group controlId="endDate">
//           <Form.Label>End Date</Form.Label>
//           <Form.Control type="date" name="endDate" />
//         </Form.Group>
//         <Button variant="primary" type="submit">Search</Button>
//         <Button variant="secondary" onClick={handleReset}>Reset</Button>
//       </Form>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             {Object.keys(transactions[0] || {}).map((header) => (
//               <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length === 0 ? (
//             <tr><td colSpan={Object.keys(transactions[0] || {}).length}>No transactions available</td></tr>
//           ) : (
//             transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 {Object.keys(transaction).map((key) => (
//                   <td key={key}>
//                     {key === 'date' ? new Date(transaction[key]).toLocaleString() :
//                      key === 'amount' ?` $${transaction[key]}` :
//                      transaction[key]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       <Pagination>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => onPageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//     </div>
//   );
// };

// export default PassbookTable;
//-------
///// finally crt code
import React from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const PassbookTable = ({ transactions, onDateRangeChange, totalPages, currentPage, onPageChange }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    onDateRangeChange(startDate, endDate);
  };

  const handleReset = () => {
    onDateRangeChange(null, null);
  };

  // Sanitize content before rendering
  const sanitizeContent = (content) => DOMPurify.sanitize(content);

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" name="startDate" />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" name="endDate" />
        </Form.Group>
        <Button variant="primary" type="submit">Search</Button>
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
      </Form>

      <Table striped bordered hover className="table table-bordered table-striped table-hover">
      
        <thead className="table-dark">
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
                     key === 'amount' ?` $${transaction[key]}` :
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
//---------------------- finnaly to

// import React from 'react';
// import { Table, Button, Form, Pagination } from 'react-bootstrap';
// import DOMPurify from 'dompurify';

// const PassbookTable = ({ transactions, onDateRangeChange, totalPages, currentPage, onPageChange }) => {
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const startDate = e.target.startDate.value;
//     const endDate = e.target.endDate.value;
//     onDateRangeChange(startDate, endDate);
//   };

//   const handleReset = () => {
//     onDateRangeChange(null, null);
//   };

//   const sanitizeContent = (content) => DOMPurify.sanitize(content);

//   return (
//     <div>
//       <Form onSubmit={handleSearch}>
//         <Form.Group controlId="startDate">
//           <Form.Label>Start Date</Form.Label>
//           <Form.Control type="date" name="startDate" />
//         </Form.Group>
//         <Form.Group controlId="endDate">
//           <Form.Label>End Date</Form.Label>
//           <Form.Control type="date" name="endDate" />
//         </Form.Group>
//         <Button variant="primary" type="submit">Search</Button>
//         <Button variant="secondary" onClick={handleReset}>Reset</Button>
//       </Form>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Description</th>
//             <th>Amount</th>
//             <th>Balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr key={index}>
//               <td>{transaction.date}</td>
//               <td dangerouslySetInnerHTML={{ __html: sanitizeContent(transaction.description) }}></td>
//               <td>{transaction.amount}</td>
//               <td>{transaction.balance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Pagination>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => onPageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//     </div>
//   );
// };

// export default PassbookTable;



////////////////
