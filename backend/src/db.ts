// src/db.ts
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'kien',
  password: 'kien102105',
  database: 'qlhs2',
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
