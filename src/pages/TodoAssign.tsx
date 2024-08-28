// src/pages/TodoAssign.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAssignedUsers } from '../store/todoUserSlice';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import axios from '../api/axiosInstance';

export default function TodoAssign({ todoId }: { todoId: number }) {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchAssignedUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/users');
    setUsers(response.data);
  };

  const fetchAssignedUsers = async () => {
    const response = await axios.get(`/todos/${todoId}/users`);
    setSelectedUsers(response.data.map((user: { id: number }) => user.id));
  };

  const handleSave = async () => {
    await axios.post(`/todos/${todoId}/users`, { userIds: selectedUsers });
    setShow(false);
  };

  const handleClose = () => setShow(false);

  return (
    <Container>
      <Button onClick={() => setShow(true)}>Assign Users</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {users.map((user) => (
              <Form.Check
                key={user.id}
                type="checkbox"
                id={`user-${user.id}`}
                label={user.name}
                checked={selectedUsers.includes(user.id)}
                onChange={() => {
                  if (selectedUsers.includes(user.id)) {
                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                  } else {
                    setSelectedUsers([...selectedUsers, user.id]);
                  }
                }}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
