import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = req.query.search ? `%${req.query.search}%` : '%';
  const offset = (page - 1) * pageSize;

  pool.query<RowDataPacket[]>(
    `SELECT 
          room.id, room.name, room.centerId, room.status, room.size, room.note, center.name AS centerName 
        FROM room
        LEFT JOIN center ON room.centerId = center.id WHERE room.name LIKE ? OR room.note LIKE ? OR center.name LIKE ? ORDER BY room.name ASC LIMIT ?, ?`,
    [search, search, search, offset, pageSize],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get all centers for the select box in the form
router.get('/centers', async (req, res) => {
    try {
      pool.query<RowDataPacket[]>('SELECT id, name FROM center', (err, results) => {
        if (err) throw err;
        res.json(results);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

router.post('/', (req, res) => {
  const { name, status, centerId, size, note } = req.body;

  pool.query('INSERT INTO room (name, status, centerId, size, note) VALUES (?,?,?,?,?)', 
    [name, status, centerId, size, note], 
    (err) => {
      if (err) throw err;
      res.status(201).send('Room created');
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, centerId, size, note } = req.body;

  pool.query(
    'UPDATE room SET name = ?, status = ?, centerId = ?, size = ?, note = ? WHERE id = ?',
    [name, status, centerId, size, note, id],
    (err) => {
      if (err) throw err;
      res.status(200).send('Room updated');
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM room WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Room deleted');
  });
});

export default router;
