// src/index.ts
// Add these imports
import express from 'express';
import cors from 'cors';
import pool from './db';
import mysql, { QueryResult, RowDataPacket } from 'mysql2/promise';
import jwt, { JWTPayload, SignJWT } from 'jose';
import crypto from 'crypto';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

async function createToken(payload: JWTPayload | undefined): Promise<SignJWT> {
  const secret = new TextEncoder().encode('your_secret_key');

  const token = await new jwt.SignJWT(payload);
  token.setProtectedHeader({ alg: 'HS256' });
  token.setExpirationTime('1h');
  token.sign(secret);
  return token;
};


// create login api with jwt support, using jose for JWT generation and verification
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // authenticate the user from database
  pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username =? limit 1', [username], (err, results) => {
    // get first record from the results
    let user = results[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // compare hashed password with stored hashed password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // create jwt token with user information
    let token = createToken({ id: user.id, username: user.username, role: user.role, department: user.department });
    res.status(200).json({ token });
  });
});

// User Endpoints
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, password, role, department } = req.body;
  // hash the password before storing it in the database using crypto
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  pool.query('INSERT INTO users (name, password, role, department) VALUES (?,?,?,?)', [name, hashedPassword, role, department], (err) => {
    if (err) throw err;
    res.status(201).send('User created');
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, password, role, department } = req.body;
  pool.query('UPDATE users SET name = ?, password = ?, role = ?, department = ? WHERE id = ?', [name, password, role, department, id], (err) => {
    if (err) throw err;
    res.status(200).send('User updated');
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('User deleted');
  });
});

// Updated Todo Endpoints
app.get('/api/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  pool.query<mysql.ResultSetHeader>('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, id], (err) => {
    if (err) throw err;
    res.status(200).send('Todo updated');
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Todo deleted');
  });
});

// Endpoints for assigning users to todos
app.post('/api/todos/:id/users', (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body;
  pool.query('DELETE FROM user_todos WHERE todo_id = ?', [id], (err) => {
    if (err) throw err;
    const values = userIds.map((userId: number) => [userId, id]);
    pool.query('INSERT INTO user_todos (user_id, todo_id) VALUES ?', [values], (err) => {
      if (err) {
        res.status(200).send('Users not assigned');
      } else {
        res.status(200).send('Users assigned');
      }
    });
  });
});

app.get('/api/todos/:id/users', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT u.* FROM users u JOIN user_todos ut ON u.id = ut.user_id WHERE ut.todo_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
