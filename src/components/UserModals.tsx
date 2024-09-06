import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import UserForm from '@/components/UserForm';
import { User } from '@/store/userSlice';

interface UserModalsProps {
  showAddModal: boolean;
  handleCloseAddModal: () => void;
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
}

const UserModals: React.FC<UserModalsProps> = ({
  showAddModal,
  handleCloseAddModal,
  showEditModal,
  handleCloseEditModal,
  currentUser,
  setCurrentUser,
  addUser,
  updateUser
}) => {
  const handleAddUser = (user: User) => {
    addUser(user);
    handleCloseAddModal();
  };

  const handleUpdateUser = (user: User) => {
    if (currentUser) {
      updateUser({ ...currentUser, ...user });
      handleCloseEditModal();
    }
  };

  return (
    <>
      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            initialData={{ username: '', password: '', role: '', department: '' }}
            onSubmit={handleAddUser}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <UserForm
              initialData={currentUser}
              onSubmit={handleUpdateUser}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
              <Button variant="primary" type="submit" form="userForm">Save Changes</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModals;
