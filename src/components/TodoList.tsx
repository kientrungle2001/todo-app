import { ListGroup, Button } from 'react-bootstrap';
import { Todo } from '../store/todoSlice';
import { FaCheck, FaEdit, FaTrashAlt, FaUserPlus } from 'react-icons/fa';

interface TodoListProps {
    todos: Todo[];
    handleShowEditModal: (id: number, title: string) => void;
    handleShowAssignModal: (id: number, title: string) => void;
    handleToggleTodo: (id: number, completed: boolean) => void;
    handleShowConfirmModal: (id: number) => void;
}

const TodoList = ({ todos, handleShowEditModal, handleShowAssignModal, handleToggleTodo, handleShowConfirmModal }: TodoListProps) => {
    return (
        <ListGroup>
            {todos.map((todo) => 
                <ListGroup.Item key={todo.id} className={'d-flex justify-content-between align-items-start ' + (todo.completed ? 'text-decoration-line-through' : '')}>
                    <div className="ms-2 me-auto">
                        {todo.title}
                    </div>
                    <div>
                        <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(todo.id, todo.title)}>
                            <FaEdit style={{ marginRight: '8px' }} />
                            Edit
                        </Button>
                        <Button variant="warning" className="mx-2" onClick={() => handleShowAssignModal(todo.id, todo.title)}>
                            <FaUserPlus style={{ marginRight: '8px' }} />
                            Assign Users
                        </Button>
                        <Button variant="success" className="mx-2" onClick={() => handleToggleTodo(todo.id, todo.completed)}>
                            <FaCheck style={{ marginRight: '8px' }} />
                            {todo.completed ? 'Undo' : 'Done'}
                        </Button>
                        <Button variant="danger" onClick={() => handleShowConfirmModal(todo.id)}>
                            <FaTrashAlt style={{ marginRight: '8px' }} />
                            Delete
                        </Button>
                    </div>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default TodoList;
