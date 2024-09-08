import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface RoomFormProps {
  initialData: {
    name: string;
    status: number;
    centerId: number;
    size: number;
    note: string;
  };
  onSubmit: (room: {
    name: string;
    status: number;
    centerId: number;
    size: number;
    note: string;
  }) => void;
  centers: { id: number; name: string }[];  // Centers for the select box
}

const RoomForm: React.FC<RoomFormProps> = ({ initialData, centers, onSubmit }) => {
  const [name, setName] = useState(initialData.name);
  const [status, setStatus] = useState(initialData.status);
  const [centerId, setCenterId] = useState(initialData.centerId);
  const [size, setSize] = useState(initialData.size);
  const [note, setNote] = useState(initialData.note);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, status, centerId, size, note });
  };

  return (
    <Form id="roomForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formRoomName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRoomStatus">
        <Form.Label>Status</Form.Label>
        <Form.Check
          type="switch"
          label={status === 1 ? 'Active' : 'Inactive'}
          checked={status === 1}
          onChange={() => setStatus(status === 1 ? 0 : 1)}
        />
      </Form.Group>

      <Form.Group controlId="formCenterId">
        <Form.Label>Center</Form.Label>
        <Form.Select value={centerId} onChange={e => setCenterId(Number(e.target.value))}>
          <option value={0}>Select Center</option>
          {centers.map(center => (
            <option key={center.id} value={center.id}>{center.name}</option>
          ))}
        </Form.Select>

      </Form.Group>

      <Form.Group controlId="formRoomSize">
        <Form.Label>Size</Form.Label>
        <Form.Control
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRoomNote">
        <Form.Label>Note</Form.Label>
        <Form.Control
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Form.Group>

    </Form>
  );
};

export default RoomForm;
