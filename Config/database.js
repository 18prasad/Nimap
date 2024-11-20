// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'localhost', 
//   user: 'root', 
//   password: 'root', 
//   database: 'nimap',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;
require('dotenv').config();  // Load environment variables from .env file
const mysql = require('mysql2/promise');

// Use process.env to get the values from .env file
const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Default to 'localhost' if not set in .env
  user: process.env.DB_USER ,      // Default to 'root'
  password: process.env.DB_PASSWORD , // Default to 'root'
  database: process.env.DB_NAME , // Default to 'nimap'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
