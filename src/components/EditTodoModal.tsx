import { Modal, Button, Form } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

interface EditTodoModalProps {
  show: boolean;
  handleClose: () => void;
  handleEditTodo: () => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
}

const EditTodoModal = ({ show, handleClose, handleEditTodo, editTitle, setEditTitle }: EditTodoModalProps) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Todo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Control
        type="text"
        placeholder="Edit todo title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        <FaTimes style={{ marginRight: '8px' }} /> Close
      </Button>
      <Button variant="primary" onClick={handleEditTodo}>
        <FaSave style={{ marginRight: '8px' }} /> Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditTodoModal;
