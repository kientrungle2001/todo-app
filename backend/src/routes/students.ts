import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

const router = express.Router();

// Helper function to format date to dd/mm/yyyy
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // en-GB provides dd/mm/yyyy format
};

// Get all students with pagination, search, classId filtering, and formatted dates
router.get('/', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = req.query.search ? `%${req.query.search}%` : '%';
    const classId = req.query.classId ? parseInt(req.query.classId as string) : null;
    const offset = (page - 1) * pageSize;

    let query = `
      SELECT 
        s.*, 
        cs.classId, cs.className, cs.subjectId, cs.subjectName, cs.teacherId, cs.teacherName,
        cs.startClassDate, cs.endClassDate
      FROM student AS s
      LEFT JOIN class_student AS cs ON s.id = cs.studentId
      WHERE (s.name LIKE ? OR s.phone LIKE ? OR s.address LIKE ?)
    `;

    const params: Array<string | number> = [search, search, search];
    if (classId) {
        query += ` AND cs.classId = ?`;
        params.push(classId);
    }

    query += ` ORDER BY s.name ASC LIMIT ?, ?`;
    params.push(offset, pageSize);

    pool.query<RowDataPacket[]>(query, params, (err, results) => {
        if (err) throw err;

        // Format the date fields in dd/mm/yyyy before sending the response
        const formattedResults = results.map(row => ({
            ...row,
            startClassDate: formatDate(row.startClassDate),
            endClassDate: formatDate(row.endClassDate)
        }));

        res.json(formattedResults);
    });
});



// Get a single student by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    pool.query<RowDataPacket[]>('SELECT * FROM student WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Student not found');
        }
    });
});

// Add a new student
router.post('/', (req, res) => {
    const {
        name, phone, school, extraFields, birthYear, schoolYear, classes, address, birthDate, parentName, paid,
        startStudyDate, endStudyDate, currentClassNames, periodNames, periodIds, note, online, classed, type,
        status, rating, assignId, assignName, color, fontStyle, currentClassIds, subjectIds, subjectNames,
        teacherIds, code, adviceStatus, adviceNote, grade, email, zalo, facebook
    } = req.body;

    pool.query(
        `INSERT INTO student (name, phone, school, extraFields, birthYear, schoolYear, classes, address, birthDate, 
      parentName, paid, startStudyDate, endStudyDate, currentClassNames, periodNames, periodIds, note, online, 
      classed, type, status, rating, assignId, assignName, color, fontStyle, currentClassIds, subjectIds, 
      subjectNames, teacherIds, code, adviceStatus, adviceNote, grade, email, zalo, facebook) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            name, phone, school, extraFields, birthYear, schoolYear, classes, address, birthDate, parentName, paid,
            startStudyDate, endStudyDate, currentClassNames, periodNames, periodIds, note, online, classed, type,
            status, rating, assignId, assignName, color, fontStyle, currentClassIds, subjectIds, subjectNames,
            teacherIds, code, adviceStatus, adviceNote, grade, email, zalo, facebook
        ],
        (err) => {
            if (err) throw err;
            res.status(201).send('Student created');
        }
    );
});

// Update an existing student
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        name, phone, school, extraFields, birthYear, schoolYear, classes, address, birthDate, parentName, paid,
        startStudyDate, endStudyDate, currentClassNames, periodNames, periodIds, note, online, classed, type,
        status, rating, assignId, assignName, color, fontStyle, currentClassIds, subjectIds, subjectNames,
        teacherIds, code, adviceStatus, adviceNote, grade, email, zalo, facebook
    } = req.body;

    pool.query(
        `UPDATE student SET name = ?, phone = ?, school = ?, extraFields = ?, birthYear = ?, schoolYear = ?, 
      classes = ?, address = ?, birthDate = ?, parentName = ?, paid = ?, startStudyDate = ?, endStudyDate = ?, 
      currentClassNames = ?, periodNames = ?, periodIds = ?, note = ?, online = ?, classed = ?, type = ?, 
      status = ?, rating = ?, assignId = ?, assignName = ?, color = ?, fontStyle = ?, currentClassIds = ?, 
      subjectIds = ?, subjectNames = ?, teacherIds = ?, code = ?, adviceStatus = ?, adviceNote = ?, grade = ?, 
      email = ?, zalo = ?, facebook = ? WHERE id = ?`,
        [
            name, phone, school, extraFields, birthYear, schoolYear, classes, address, birthDate, parentName, paid,
            startStudyDate, endStudyDate, currentClassNames, periodNames, periodIds, note, online, classed, type,
            status, rating, assignId, assignName, color, fontStyle, currentClassIds, subjectIds, subjectNames,
            teacherIds, code, adviceStatus, adviceNote, grade, email, zalo, facebook, id
        ],
        (err) => {
            if (err) throw err;
            res.status(200).send('Student updated');
        }
    );
});

// Delete a student
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM student WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.status(200).send('Student deleted');
    });
});

export default router;
