import { Modal, Button } from 'react-bootstrap';
import { FaTrash, FaTimes } from 'react-icons/fa';

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDeleteTodo: () => void;
}

const ConfirmDeleteModal = ({ show, handleClose, handleDeleteTodo }: ConfirmDeleteModalProps) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this Todo item?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        <FaTimes style={{ marginRight: '8px' }} /> Cancel
      </Button>
      <Button variant="danger" onClick={handleDeleteTodo}>
        <FaTrash style={{ marginRight: '8px' }} /> Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmDeleteModal;
