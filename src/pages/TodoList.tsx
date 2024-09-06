// file src/pages/TodoList.tsx
import { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTodos, editTodo, removeTodo, toggleTodo, Todo } from '@/store/todoSlice';
import { fetchUsers } from '@/store/userSlice';
import { useRouter } from 'next/router';
import { verifyToken } from '@/hooks/useAuth';
import TodoList from '@/components/TodoList';
import EditTodoModal from '@/components/EditTodoModal';
import AssignUsersModal from '@/components/AssignUsersModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import {
  getTodos,
  addTodo,
  editTodo as apiEditTodo,
  deleteTodo as apiDeleteTodo,
  toggleTodo as apiToggleTodo,
  getAssignedUsers,
  assignUsersToTodo
} from '@/api/apiClient';

export default function Home() {
  const router = useRouter();
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
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        localStorage.removeItem('token');
        router.push('/login');
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    getTodos().then((response) => {
      dispatch(setTodos(response.data));
    });
  }, [dispatch]);

  const handleAddTodo = () => {
    addTodo(newTitle).then(() => {
      getTodos().then((response) => {
        dispatch(setTodos(response.data));
      });
    });
    setNewTitle('');
  };

  const handleEditTodo = () => {
    if (editingTodo !== null) {
      apiEditTodo(editingTodo, editTitle, false).then(() => {
        dispatch(editTodo({ id: editingTodo, title: editTitle, completed: false }));
      });
      setEditingTodo(null);
      setEditTitle('');
      setShowEditModal(false);
    }
  };

  const handleDeleteTodo = () => {
    if (todoToDelete !== null) {
      apiDeleteTodo(todoToDelete).then(() => {
        dispatch(removeTodo(todoToDelete));
        setShowConfirmModal(false);
        setTodoToDelete(null);
      });
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    apiToggleTodo(id, completed).then(() => {
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
    getAssignedUsers(assignTodo).then((response) => {
      setUsers(response.data.map((user: { id: number; username: string }) => user.id));
    });
  };

  const handleShowAssignModal = (id: number, title: string) => {
    setAssignTodo(id);
    setAssignTitle(title);
    setShowAssignModal(true);
    dispatch(fetchUsers({
      page: 1,
      pageSize: 1000000 // This will get all users
    }));
    fetchAssignedUsers(id);
  };

  const handleCloseAssignModal = () => setShowAssignModal(false);

  const handleAssignTodo = (userId: number) => {
    if (users.includes(userId)) {
      setUsers(users.filter((id) => id !== userId));
    } else {
      setUsers([...users, userId]);
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
    assignUsersToTodo(assignTodo!, users).then(() => {
      setShowAssignModal(false);
      setUsers([]);
    });
  };

  return (
    <Container>
      <h1>Todo List <Button variant="danger" onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}>
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
      <TodoList
        todos={todos}
        handleShowEditModal={handleShowEditModal}
        handleShowAssignModal={handleShowAssignModal}
        handleToggleTodo={handleToggleTodo}
        handleShowConfirmModal={handleShowConfirmModal}
      />
      <EditTodoModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEditTodo={handleEditTodo}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
      />
      <AssignUsersModal
        show={showAssignModal}
        handleClose={handleCloseAssignModal}
        handleAssignTodo={handleAssignTodo}
        handleAssignsTodo={handleAssignsTodo}
        assignTitle={assignTitle}
        allUsers={allUsers}
        users={users}
      />
      <ConfirmDeleteModal
        show={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        handleDeleteTodo={handleDeleteTodo}
      />
    </Container>
  );
}
