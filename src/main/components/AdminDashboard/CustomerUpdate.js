import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerUpdate = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const { customerId } = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleSubmit1=(e) =>{
    navigate(`/dashboard`)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/accounts/${customerId}`, customer);

      navigate('/admindashboard');
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalBalance" className="form-label">Total Balance</label>
          <input
            type="number"
            className="form-control"
            id="totalBalance"
            name="totalBalance"
            value={customer.totalBalance}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="active" className="form-label">Active</label>
          <select
            id="active"
            name="active"
            className="form-control"
            value={customer.active}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
     
    </div>
    
  );
};

export default CustomerUpdate;