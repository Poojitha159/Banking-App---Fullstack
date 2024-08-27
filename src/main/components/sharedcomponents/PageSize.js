import React from 'react';
import './PageSize.css'
const PageSize = ({ pageSize, onPageSizeChange }) => {
  const sizes = [1,5, 10, 20, 50];

  return (
    <div>
      {/* <label htmlFor="pageSize">Items per page:</label> */}
      <label htmlFor="pageSize" className="fs-6">Items per page:</label>

      <select
        id="pageSize"
        className="form-control"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {sizes.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};



export default PageSize;