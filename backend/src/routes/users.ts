// file backend/src/routes/users.ts
import express from 'express';
import crypto from 'crypto';
import pool from '../db';
import mysql, { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = req.query.search ? `%${req.query.search}%` : '%';
  const offset = (page - 1) * pageSize;

  pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE username LIKE ? OR role LIKE ? OR department LIKE ? LIMIT ?, ?',
    [search, search, search, offset, pageSize],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post('/', (req, res) => {
  const { username, password, role, department } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  pool.query('INSERT INTO users (username, password, role, department) VALUES (?,?,?,?)', [username, hashedPassword, role, department], (err) => {
    if (err) throw err;
    res.status(201).send('User created');
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, password, role, department } = req.body;

  let query = 'UPDATE users SET username = ?, role = ?, department = ?';
  const params = [username, role, department];

  if (password) {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    query += ', password = ?';
    params.push(hashedPassword);
  }

  query += ' WHERE id = ?';
  params.push(id);

  pool.query(query, params, (err) => {
    if (err) throw err;
    res.status(200).send('User updated');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('User deleted');
  });
});

export default router;
