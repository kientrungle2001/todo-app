import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserForm from '@/components/UserForm';

interface UserModalsProps {
  showAddModal: boolean;
  handleCloseAddModal: () => void;
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  currentUser: { id: number; username: string; password?: string; role?: string; department?: string } | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<{ id: number; username: string; password?: string; role?: string; department?: string } | null>>;
  addUser: (user: { username: string; password: string; role: string; department: string }) => void;
  updateUser: (user: { id: number; username: string; password?: string; role?: string; department?: string }) => void;
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
  const handleAddUser = (user: { username: string; password: string; role: string; department: string }) => {
    addUser(user);
    handleCloseAddModal();
  };

  const handleUpdateUser = (user: { id: number; username: string; password?: string; role?: string; department?: string }) => {
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
          <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
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
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModals;
