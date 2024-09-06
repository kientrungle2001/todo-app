import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteUser, fetchUsers, addUser, updateUser, setPagination, User } from '../store/userSlice';
import { Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import UserModals from '@/components/UserModals';

export default function UserList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const pagination = useAppSelector(state => state.users.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState('');  // Add searchText state

  useEffect(() => {
    dispatch(fetchUsers({ page: pagination.page, pageSize: pagination.pageSize, searchText })); // Pass pagination info and search text to fetch users
  }, [dispatch, pagination, searchText]);

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleShowEditModal = (user: User) => {
    let currentUser = { ...user };
    currentUser.password = '';
    setCurrentUser(currentUser);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <Container>
      <h1>User List</h1>

      {/* Search Box */}
      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by Username, Role, or Department"
          value={searchText}
          onChange={e => setSearchText(e.target.value)} // Update searchText state
        />
      </Form.Group>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add User</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>
                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id ?? 0)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        />
        <Pagination.Item active>{pagination.page}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(pagination.page + 1)} />
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
