import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface CenterFormProps {
  initialData: { name: string; code: string; address: string; status: number };
  onSubmit: (center: { name: string; code: string; address: string; status: number }) => void;
}

const CenterForm: React.FC<CenterFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData.name);
  const [code, setCode] = useState(initialData.code);
  const [address, setAddress] = useState(initialData.address);
  const [status, setStatus] = useState(initialData.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, code, address, status });
  };

  return (
    <Form id="centerForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formCenterName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter center name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCenterCode">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCenterAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCenterStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter status"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
};

export default CenterForm;
