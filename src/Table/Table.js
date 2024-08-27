import React from 'react';

import Pagination from './Pagination/Pagination';

const Table = ({ data, columns, pagination, onUpdate, onVerify }) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.label}</th>
            ))}
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.customerId}>
              {columns.map((column) => (
                <td key={column.field}>
                  {column.field === 'active'
                    ? item[column.field]
                      ? 'Active'
                      : 'Inactive'
                    : item[column.field]}
                </td>
              ))}
              <td>
                {item.active ? (
                  <button onClick={() => onUpdate(item.customerId)}>Update</button>
                ) : (
                  <button onClick={() => onVerify(item.customerId)}>Verify</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <Pagination pager={pagination} />
      </div>
    </div>
  );
};

export default Table;