const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '34.135.8.53',
  database: 'postgres',
  password: 'akshayandy7093',
  port: 5432, // Default PostgreSQL port
});

(async function startup() {
    await pool.connect();
})();

module.exports = pool;

// // Example query
// pool.query('SELECT * FROM movies_data', (err, res) => {
//   if (err) {
//     console.error('Error executing query', err);
//     return;
//   }
//   console.log('Query result:', res.rows);
//   pool.end(); // Close the connection pool
// });
