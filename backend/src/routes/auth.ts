import express from 'express';
import crypto from 'crypto';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username =? LIMIT 1', [username], (err, results) => {
    if (typeof results == 'undefined' || typeof results[0] === 'undefined') {
      return res.status(401).json({ message: 'Invalid credentials. Credential not found' });
    }
    let user = results[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Credential not found' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ id: user.id, username: user.username, role: user.role, department: user.department });
  });
});

export default router;
