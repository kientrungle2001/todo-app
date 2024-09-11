import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

// Get list of teachers
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 100;
    const search = req.query.search ? `%${req.query.search}%` : '%';
    const offset = (page - 1) * pageSize;

    try {
        pool.query<RowDataPacket[]>('SELECT  COUNT(*) as total FROM teacher', (err, response) => {
            if (err) throw err;
            const total = response[0].total;
            console.log(`Total teachers: ${total}`);
        });
        pool.query(
            `SELECT * FROM teacher WHERE name LIKE ? OR phone LIKE ? OR code LIKE ? ORDER BY id ASC LIMIT ?, ?`,
            [search, search, search, offset, pageSize],
            (err, response) => {
                if (err) throw err;
                res.json(response);
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching teachers' });
    }
});

// Create a new teacher
router.post('/', (req, res) => {
    const { name, phone, address, school, salary, password, subjectId, status, departmentId, type, code } = req.body;
    pool.query(
        'INSERT INTO teacher (name, phone, address, school, salary, password, subjectId, status, departmentId, type, code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, phone, address, school, salary, password, subjectId, status, departmentId, type, code],
        (err) => {
            if (err) throw err;
            res.status(201).send('Teacher created');
        }
    );
});

// Update an existing teacher by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, address, school, salary, password, subjectId, status, departmentId, type, code } = req.body;
    pool.query(
        'UPDATE teacher SET name = ?, phone = ?, address = ?, school = ?, salary = ?, password = ?, subjectId = ?, status = ?, departmentId = ?, type = ?, code = ? WHERE id = ?',
        [name, phone, address, school, salary, password, subjectId, status, departmentId, type, code, id],
        (err) => {
            if (err) throw err;
            res.status(200).send('Teacher updated');
        }
    );
});

// Delete a teacher by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM teacher WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.status(200).send('Teacher deleted');
    });
});

export default router;
