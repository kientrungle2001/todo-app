import express from 'express';
import pool from '../db';
import mysql from 'mysql2/promise';

const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { title } = req.body;
  pool.query<mysql.ResultSetHeader>('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, id], (err) => {
    if (err) throw err;
    res.status(200).send('Todo updated');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Todo deleted');
  });
});

export default router;
