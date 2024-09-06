import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteUser, fetchUsers, addUser, updateUser, setPagination } from '../store/userSlice';
import { Button, Container, ListGroup, Pagination } from 'react-bootstrap';
import UserModals from '@/components/UserModals';

export default function UserList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const pagination = useAppSelector(state => state.users.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleShowEditModal = (user: { id: number; username: string }) => {
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
            {user.username}
            <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(user)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination>
        <Pagination.Prev onClick={() => dispatch(setPagination({ ...pagination, page: pagination.page - 1 }))} />
        <Pagination.Next onClick={() => dispatch(setPagination({ ...pagination, page: pagination.page + 1 }))} />
      </Pagination>

      <UserModals
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        addUser={user => dispatch(addUser(user))}
        updateUser={user => dispatch(updateUser(user))}
      />
    </Container>
  );
}
