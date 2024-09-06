import express from 'express';
import pool from '../db';

const router = express.Router();

router.post('/:id/users', (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body;
  pool.query('DELETE FROM user_todos WHERE todo_id = ?', [id], (err) => {
    if (err) throw err;
    const values = userIds.map((userId: number) => [userId, id]);
    pool.query('INSERT INTO user_todos (user_id, todo_id) VALUES ?', [values], (err) => {
      if (err) {
        res.status(200).send('Users not assigned');
      } else {
        res.status(200).send('Users assigned');
      }
    });
  });
});

router.get('/:id/users', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT u.* FROM users u JOIN user_todos ut ON u.id = ut.user_id WHERE ut.todo_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

export default router;
