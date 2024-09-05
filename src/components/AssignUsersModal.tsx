import { Modal, Button, Form } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import { User } from '@/store/userSlice';

interface AssignUsersModalProps {
    show: boolean;
    handleClose: () => void;
    handleAssignTodo: (userId: number) => void;
    handleAssignsTodo: () => void;
    assignTitle: string;
    allUsers: { items: User[] };
    users: number[];
}

const AssignUsersModal = ({ show, handleClose, handleAssignTodo, handleAssignsTodo, assignTitle, allUsers, users }: AssignUsersModalProps) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Assign Users for "{assignTitle}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {allUsers.items.map(user => (
                <Form.Check
                    key={user.id}
                    type="checkbox"
                    id={`user-${user.id}`}
                    label={user.name}
                    checked={users.includes(user.id)}
                    onChange={() => handleAssignTodo(user.id)}
                />
            ))}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                <FaTimes style={{ marginRight: '8px' }} /> Close
            </Button>
            <Button variant="primary" onClick={handleAssignsTodo}>
                <FaSave style={{ marginRight: '8px' }} /> Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export default AssignUsersModal;
