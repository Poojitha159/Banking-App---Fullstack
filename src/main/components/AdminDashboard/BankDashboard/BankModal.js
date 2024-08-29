import React,{useState} from 'react';
import { Modal, Form, Button} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'; 
import { toast, ToastContainer } from 'react-toastify';


export const AddBankModal = ({ show, onHide, handleAddBank }) => {
    const [newBank, setNewBank] = useState({ fullName: '', abbreviation: '' });
  
    const handleInputChange = (e, field) => {
      setNewBank({ ...newBank, [field]: e.target.value });
    };
  
    const handleSaveChanges = () => {
      if (newBank.fullName && newBank.abbreviation) {
        handleAddBank(newBank);
        // Optionally, you can close the modal or clear the form here
        onHide();
      } else {
        toast.error('Invalid details: Please enter both full name and abbreviation.');
      }
    };
  
    return (
      <>
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
                  value={newBank.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                />
              </Form.Group>
              <Form.Group controlId="formAbbreviation">
                <Form.Label>Abbreviation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter abbreviation"
                  value={newBank.abbreviation}
                  onChange={(e) => handleInputChange(e, 'abbreviation')}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Toast container should be included in your main component */}
        <ToastContainer />
      </>
    );
  };
  

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

