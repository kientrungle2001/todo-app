// src/pages/UserList.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteUser, fetchUsers, addUser, updateUser } from '../store/userSlice';
import { Button, Container, Form, ListGroup, Modal, Pagination } from 'react-bootstrap';

export default function UserList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const pagination = useAppSelector(state => state.users.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: number; name: string } | null>(null);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUserName.trim()) {
      dispatch(addUser(newUserName));
      setNewUserName('');
      setShowAddModal(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleShowEditModal = (user: { id: number; name: string }) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleCloseAddModal = () => setShowAddModal(false);

  return (
    <Container>
      <h1>User List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add User</Button>
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item key={user.id}>
            {user.name}
            <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(user)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination>
        <Pagination.Prev onClick={() => dispatch(setPagination({ ...pagination, page: pagination.page - 1 }))} />
        <Pagination.Next onClick={() => dispatch(setPagination({ ...pagination, page: pagination.page + 1 }))} />
      </Pagination>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
          <Button variant="primary" onClick={handleAddUser}>Add User</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentUser.name}
                  onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
          <Button variant="primary" onClick={() => {
            if (currentUser) {
              dispatch(updateUser(currentUser));
              fetchUsers();
              handleCloseEditModal();
            }
          }}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
