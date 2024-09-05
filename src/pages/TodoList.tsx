// src/pages/index.tsx
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTodos, addTodo, editTodo, removeTodo, toggleTodo, Todo } from '../store/todoSlice';
import { Container, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import { fetchUsers } from '@/store/userSlice';
import { useRouter } from 'next/router';
import { jwtVerify } from 'jose';
import { FaCheck, FaEdit, FaPlus, FaSave, FaSignOutAlt, FaTimes, FaTrash, FaTrashAlt, FaUserPlus } from 'react-icons/fa';

async function verifyToken(token: string) {
  const secret = new TextEncoder().encode('your_secret_key');

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}



export default function Home() {

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');  // Remove the JWT token
    router.push('/login');  // Redirect to the login page
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        verifyToken(token);
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector((state) => state.todos.todos);
  const allUsers = useAppSelector((state) => state.users);
  const [newTitle, setNewTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  const [assignTitle, setAssignTitle] = useState('');
  const [assignTodo, setAssignTodo] = useState<number | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const [users, setUsers] = useState<number[]>([]);

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

  const fetchAssignedUsers = (assignTodo: number) => {
    axios.get(`/todos/${assignTodo}/users`).then((response) => {
      setUsers(response.data.map((user: { id: number; name: string }) => user.id));
    });
  };
  const handleShowAssignModal = (id: number, title: string) => {
    setAssignTodo(id);
    setAssignTitle(title);
    setShowAssignModal(true);
    dispatch(fetchUsers());
    fetchAssignedUsers(id);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
  };

  const handleAssignTodo = (userId: number) => {
    if (users.includes(userId)) {
      // remove the user from the list
      const updatedUsers = users.filter((id) => id !== userId);
      setUsers(updatedUsers);
    } else {
      const updatedUsers = [...users];
      updatedUsers.push(userId);
      setUsers(updatedUsers);
    }
  };

  const handleShowConfirmModal = (id: number) => {
    setTodoToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTodoToDelete(null);
  };

  const handleAssignsTodo = () => {
    axios.post(`/todos/${assignTodo}/users`, { userIds: users }).then(() => {
      setShowAssignModal(false);
      setUsers([]);
    });
  };

  return (
    <Container>
      <h1>Todo List <Button variant="danger" onClick={logout}>
        <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
      </Button></h1>
      <Form.Control
        type="text"
        placeholder="Add new todo"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Button onClick={handleAddTodo} className="my-3">
        <FaPlus style={{ marginRight: '8px' }} />
        Add Todo
      </Button>
      <ListGroup>
        {todos.map((todo) => (
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
            <FaTimes style={{ marginRight: '8px' }} /> Close
          </Button>
          <Button variant="primary" onClick={handleEditTodo}>
            <FaSave style={{ marginRight: '8px' }} /> Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Todo Modal */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Users for "{assignTitle}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allUsers.items.map(user => {
            return (
              <Form.Check
                key={assignTodo + ' ' + user.id}
                type="checkbox"
                id={`user-${assignTodo}-${user.id}`}
                label={user.name}
                checked={users.includes(user.id)}
                onChange={(e) => handleAssignTodo(user.id)}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>
            <FaTimes style={{ marginRight: '8px' }} /> Close
          </Button>
          <Button variant="primary" onClick={handleAssignsTodo}>
            <FaSave style={{ marginRight: '8px' }} /> Save Changes
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
            <FaTimes style={{ marginRight: '8px' }} /> Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTodo}>
            <FaTrash style={{ marginRight: '8px' }} /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
