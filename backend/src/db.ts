// src/db.ts
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '42.112.21.207',
  user: 'admin_admin',
  password: 'nn123456',
  database: 'admin_qlhs2v1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: 'UTC',
  dateStrings: [
      'DATE',
      'DATETIME'
  ]
});

pool.on('connection', conn => {
  conn.query("SET time_zone='+00:00';", error => {
      if(error){
          throw error
      }
  })
})

export default pool;
