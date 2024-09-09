// file backend/src/routes/subject.ts
import express from 'express';
import pool from '../db';

const router = express.Router();

// Get list of subjects with their active classes
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = req.query.search ? `%${req.query.search}%` : '%';
    const offset = (page - 1) * pageSize;

    try {
        // Fetch subjects
        pool.query(
            `SELECT * FROM subject WHERE name LIKE ? OR code LIKE ? LIMIT ?, ?`,
            [search, search, offset, pageSize], (err, response: any[]) => {
                if (err) throw err;
                response.forEach((subject) => {
                    subject.classes = [];
                });
                let subjectIds = response.map((subject) => subject.id);
                pool.query(`SELECT * FROM classes WHERE subjectId IN (?) and status = 1`, [subjectIds], (clsError, classes: any[]) => {
                    if (clsError) throw clsError;
                    classes.forEach((cls) => {
                        if (cls.startDate instanceof Date && cls.startDate.getFullYear() === 1899) {
                            cls.startDate = null;
                        }
                        if (cls.endDate instanceof Date && cls.endDate.getFullYear() === 1899) {
                            cls.endDate = null;
                        }
                        const subjectIndex = response.findIndex((subject) => subject.id === cls.subjectId);
                        if (subjectIndex >= 0) {
                            response[subjectIndex].classes.push(cls);
                        }
                    });
                    res.json(response);
                });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching subjects' });
    }
});

// Create a new subject
router.post('/', (req, res) => {
    const { name, code, status } = req.body;
    pool.query(
        'INSERT INTO subject (name, code, status) VALUES (?, ?, ?, ?)',
        [name, code, status],
        (err) => {
            if (err) throw err;
            res.status(201).send('Subject created');
        }
    );
});

// Update an existing subject by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, code, status } = req.body;
    pool.query(
        'UPDATE subject SET name = ?, code = ?, status = ? WHERE id = ?',
        [name, code, status, id],
        (err) => {
            if (err) throw err;
            res.status(200).send('Subject updated');
        }
    );
});

// Delete a subject by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM subject WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.status(200).send('Subject deleted');
    });
});

export default router;
