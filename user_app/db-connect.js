const { Pool } = require('pg');
const creds = require('./creds.json');


const pool = new Pool({
  user: creds.user,
  host: creds.host,
  database: creds.database,
  password: creds.password,
  port: 5432, // Default PostgreSQL port
});

(async function startup() {
    await pool.connect();
})();

module.exports = pool;
