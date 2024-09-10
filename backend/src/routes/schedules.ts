import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

// Get schedules for a specific class
router.get('/', (req, res) => {
  const { classId } = req.query;
  
  pool.query<RowDataPacket[]>(
    `SELECT * FROM schedule WHERE classId = ? ORDER BY studyDate, studyTime`, 
    [classId], 
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Add a new schedule
router.post('/', (req, res) => {
  const { classId, studyDate, studyTime, status } = req.body;
  
  pool.query(
    'INSERT INTO schedule (classId, studyDate, studyTime, status) VALUES (?, ?, ?, ?)',
    [classId, studyDate, studyTime, status],
    (err) => {
      if (err) throw err;
      res.status(201).send('Schedule created');
    }
  );
});

// Update an existing schedule
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { studyDate, studyTime, status } = req.body;
  
  pool.query(
    'UPDATE schedule SET studyDate = ?, studyTime = ?, status = ? WHERE id = ?',
    [studyDate, studyTime, status, id],
    (err) => {
      if (err) throw err;
      res.status(200).send('Schedule updated');
    }
  );
});

// Delete a schedule
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  pool.query('DELETE FROM schedule WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Schedule deleted');
  });
});

export default router;
