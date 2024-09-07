// src/db.ts
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '42.112.21.207',
  user: 'admin_qlhs2',
  password: 'nn123456',
  database: 'admin_qlhs2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

export default pool;
