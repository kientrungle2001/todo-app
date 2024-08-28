// src/pages/index.tsx
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTodos, addTodo, editTodo, removeTodo, toggleTodo } from '../store/todoSlice';
import { Container, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const [newTitle, setNewTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get('/todos').then((response) => {
      dispatch(setTodos(response.data));
    });
  }, [dispatch]);

  const handleAddTodo = () => {
    axios.post('/todos', { title: newTitle }).then(() => {
      axios.get('/todos').then((response) => {
        dispatch(setTodos(response.data));
      });
    });
    setNewTitle('');
  };

  const handleEditTodo = () => {
    if (editingTodo !== null) {
      axios.put(`/todos/${editingTodo}`, { title: editTitle, completed: false }).then(() => {
        dispatch(editTodo({ id: editingTodo, title: editTitle, completed: false }));
      });
      setEditingTodo(null);
      setEditTitle('');
      setShowEditModal(false);
    }
  };

  const handleDeleteTodo = () => {
    if (todoToDelete !== null) {
      axios.delete(`/todos/${todoToDelete}`).then(() => {
        dispatch(removeTodo(todoToDelete));
        setShowConfirmModal(false);
        setTodoToDelete(null);
      });
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    axios.put(`/todos/${id}`, { completed: !completed }).then(() => {
      dispatch(toggleTodo(id));
    });
  };

  const handleShowEditModal = (id: number, title: string) => {
    setEditingTodo(id);
    setEditTitle(title);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowConfirmModal = (id: number) => {
    setTodoToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTodoToDelete(null);
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <Form.Control
        type="text"
        placeholder="Add new todo"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Button onClick={handleAddTodo} className="my-3">
        Add Todo
      </Button>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id} className={todo.completed ? 'text-decoration-line-through' : ''}>
            {todo.title}
            <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(todo.id, todo.title)}>
              Edit
            </Button>
            <Button variant="success" className="mx-2" onClick={() => handleToggleTodo(todo.id, todo.completed)}>
              {todo.completed ? 'Undo' : 'Done'}
            </Button>
            <Button variant="danger" onClick={() => handleShowConfirmModal(todo.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Todo Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
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
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Todo item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTodo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
