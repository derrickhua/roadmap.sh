const { Pool } = require('pg');

// Set up your database connection information
const pool = new Pool({
  user: 'postgres', // your database username
  host: 'localhost', // your database server
  database: 'mydatabase', // your database name
  password: 'password', // your database password
  port: 5432, // your database port
});

// Connect to the PostgreSQL server
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database!');
  // You can execute SQL queries here using the client
  // For example:
  // client.query('SELECT NOW()', (err, result) => {
  //   release();
  //   if (err) {
  //     return console.error('Error executing query', err.stack);
  //   }
  //   console.log(result.rows);
  // });
});

module.exports = pool; // Export the pool for use elsewhere in your application
