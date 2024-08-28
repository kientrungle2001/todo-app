// src/index.ts
// Add these imports
import express from 'express';
import cors from 'cors';
import pool from './db';
import mysql from 'mysql2/promise';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// User Endpoints
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  pool.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) throw err;
    res.status(201).send('User created');
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  pool.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err) => {
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
      if (err) throw err;
      res.status(200).send('Users assigned');
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
