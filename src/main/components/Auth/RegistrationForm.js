

import React, { useState } from 'react';
import { Form, Button, Col, Alert, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/service'; 
import './Registration.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'ROLE_USER', // Default role set to 'ROLE_USER'
    file1: null,
    file2: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check if any field is left empty
    const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.replace(/([A-Z])/g, ' $1')} is required!`);
        return;
      }
    }

    // Validations
    if (formData.role === 'ROLE_USER') {
      if (!formData.file1 || !formData.file2) {
        setError('Files are required for ROLE_USER!');
        return;
      }
    } else if (formData.role === 'ROLE_ADMIN') {
      if (formData.file1 || formData.file2) {
        setError('No need to upload files for ROLE_ADMIN!');
        return;
      }
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formPayload.append(key, formData[key]);
      }
    });

    try {
      const response = await registerUser(formPayload);
      setSuccess(response);
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'ROLE_USER',
        file1: null,
        file2: null,
      });
    } catch (err) {
      // Check for specific error messages from the backend
      if (err.response && err.response.data) {
        setError(err.response.data || 'Registration failed!');
      } else {
        setError('Registration failed!');
      }
    }
  };

  const handleLogin = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h2 className="my-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </Form.Control>
        </Form.Group>

        {formData.role === 'ROLE_USER' && (
          <>
            <Form.Group controlId="file1">
              <Form.Label>File 1</Form.Label>
              <Form.Control type="file" name="file1" onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="file2">
              <Form.Label>File 2</Form.Label>
              <Form.Control type="file" name="file2" onChange={handleChange} required />
            </Form.Group>
          </>
        )}

        <div className="button-container">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="primary" onClick={handleLogin} style={{ marginLeft: '10px' }}>
            Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;


