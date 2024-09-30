// pages/login.tsx
import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from '@/api/axiosInstance';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import { storage } from '@/api/storage';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { username, password });
            storage.set('token', data.token);
            storage.set('user', data.user);
            storage.set('isAuthenticated', true);
            setTimeout(() => {
                router.push('/');
            }, 100);
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    <FaSignInAlt style={{ marginRight: '8px' }} />
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
