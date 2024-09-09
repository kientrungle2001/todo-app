// file src/components/centers/RoomsModal.tsx
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRoomsByCenter, addRoom, editRoom, deleteRoom } from '@/store/roomSlice';

interface RoomsModalProps {
  centerId: number;
  show: boolean;
  onHide: () => void;
}

export default function RoomsModal({ centerId, show, onHide }: RoomsModalProps) {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.rooms.items);
  const [newRoom, setNewRoom] = useState({ name: '', size: 0, status: 1, note: '' });

  useEffect(() => {
    if (centerId && show) {
      dispatch(fetchRoomsByCenter(centerId));
    }
  }, [centerId, show, dispatch]);

  const handleAddRoom = () => {
    dispatch(addRoom({ ...newRoom, centerId })).then(() => {
      dispatch(fetchRoomsByCenter(centerId));
    });
    setNewRoom({ name: '', size: 0, status: 1, note: '' });
  };

  const handleEditRoom = (roomId: number) => {
    dispatch(editRoom({ id: roomId, ...newRoom, centerId })).then(() => {
      dispatch(fetchRoomsByCenter(centerId));
    });
  };

  const handleDeleteRoom = (roomId: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      dispatch(deleteRoom(roomId)).then(() => {
        dispatch(fetchRoomsByCenter(centerId));
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Rooms for Center ID {centerId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              value={newRoom.name}
              onChange={e => setNewRoom({ ...newRoom, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Room Size</Form.Label>
            <Form.Control
              type="number"
              value={newRoom.size}
              onChange={e => setNewRoom({ ...newRoom, size: Number(e.target.value) })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={newRoom.status}
              onChange={e => setNewRoom({ ...newRoom, status: Number(e.target.value) })}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              value={newRoom.note}
              onChange={e => setNewRoom({ ...newRoom, note: e.target.value })}
            />
          </Form.Group>
          <Button className="mt-3" onClick={handleAddRoom}>Add Room</Button>
        </Form>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Size</th>
              <th>Status</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.size}</td>
                <td>{room.status === 1 ? 'Active' : 'Inactive'}</td>
                <td>{room.note}</td>
                <td>
                  <Button variant="info" onClick={() => handleEditRoom(room.id ?? 0)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteRoom(room.id ?? 0)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
