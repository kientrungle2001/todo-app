import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface UserFormProps {
  initialData: { username: string; password: string; role: string; department: string };
  onSubmit: (user: { username: string; password: string; role: string; department: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [username, setUsername] = useState(initialData.username);
  const [password, setPassword] = useState(initialData.password);
  const [role, setRole] = useState(initialData.role);
  const [department, setDepartment] = useState(initialData.department);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password, role, department });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUserName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUserPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUserRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUserDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Save Changes</Button>
    </Form>
  );
};

export default UserForm;
