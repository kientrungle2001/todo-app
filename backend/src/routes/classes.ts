// file backend/routes/classes.ts
import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

// Get all classes with pagination and search functionality
router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = req.query.search ? `%${req.query.search}%` : '%';
  const offset = (page - 1) * pageSize;

  pool.query<RowDataPacket[]>(
    `SELECT 
        id, name, startDate, endDate, roomId, roomName, subjectId, subjectName, 
        teacherId, teacherName, level, amount, amountBy, status, teacher2Id, 
        teacher2Name, online, classed, code, feeType, scheduleDays 
      FROM classes
      WHERE name LIKE ? OR roomName LIKE ? OR subjectName LIKE ? OR teacherName LIKE ? 
      ORDER BY name ASC LIMIT ?, ?`,
    [search, search, search, search, offset, pageSize],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get a class by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query<RowDataPacket[]>('SELECT * FROM classes WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new class
router.post('/', (req, res) => {
  const { name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, teacherName, 
          level, amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, 
          scheduleDays } = req.body;

  pool.query(
    `INSERT INTO classes (name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, 
    teacherName, level, amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, 
    scheduleDays) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, teacherName, level, 
     amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, scheduleDays],
    (err) => {
      if (err) throw err;
      res.status(201).send('Class created');
    }
  );
});

// Update a class by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, teacherName, 
          level, amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, 
          scheduleDays } = req.body;

  pool.query(
    `UPDATE classes SET name = ?, startDate = ?, endDate = ?, roomId = ?, roomName = ?, subjectId = ?, 
    subjectName = ?, teacherId = ?, teacherName = ?, level = ?, amount = ?, amountBy = ?, status = ?, 
    teacher2Id = ?, teacher2Name = ?, online = ?, classed = ?, code = ?, feeType = ?, scheduleDays = ? 
    WHERE id = ?`,
    [name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, teacherName, level, 
     amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, scheduleDays, id],
    (err) => {
      if (err) throw err;
      res.status(200).send('Class updated');
    }
  );
});

// Delete a class by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM classes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(200).send('Class deleted');
  });
});

export default router;
