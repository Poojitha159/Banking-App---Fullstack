import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export const AddBankModal = ({ show, onHide, newBank, handleInputChange, handleAddBank }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="fullName"
                        value={newBank.fullName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formAbbreviation" className="mt-3">
                    <Form.Label>Abbreviation</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter abbreviation"
                        name="abbreviation"
                        value={newBank.abbreviation}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddBank}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const UpdateBankModal = ({ show, onHide, selectedBank, handleUpdateInputChange, handleUpdateBank }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Update Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedBank && (
                <Form>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            name="fullName"
                            value={selectedBank.fullName}
                            onChange={handleUpdateInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAbbreviation" className="mt-3">
                        <Form.Label>Abbreviation</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter abbreviation"
                            name="abbreviation"
                            value={selectedBank.abbreviation}
                            onChange={handleUpdateInputChange}
                        />
                    </Form.Group>
                </Form>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleUpdateBank}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

