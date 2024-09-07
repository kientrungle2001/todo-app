import express from 'express';
import pool from '../db';
import mysql, { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = req.query.search ? `%${req.query.search}%` : '%';
  const offset = (page - 1) * pageSize;

  pool.query<RowDataPacket[]>(
    'SELECT * FROM center WHERE name LIKE ? OR code LIKE ? LIMIT ?, ?',
    [search, search, offset, pageSize],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post('/', (req, res) => {
  const { name, code, address, status } = req.body;
  pool.query('INSERT INTO center (name, code, address, status) VALUES (?, ?, ?, ?)', [name, code, address, status], (err) => {
    if (err) throw err;
    res.status(201).send('Center created');
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, code, address, status } = req.body;
  pool.query('UPDATE center SET name = ?, code = ?, address = ?, status = ? WHERE id = ?', [name, code, address, status, id], (err) => {
    if (err) throw err;
    res.status(200).send('Center updated');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM center WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Center deleted');
  });
});

export default router;
