// // users.dao.js

// const pool = require('../db-connect'); // Assuming you've exported the PostgreSQL connection pool from db-connect.js
// const bcrypt = require('bcrypt');

// async function createUser(username, email, password) {
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
//         return true; // Return true if user creation is successful
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error; // Throw error if user creation fails
//     }
// }

// async function findUserByUsername(username) {
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//         return result.rows[0]; // Return user object if found, or undefined if not found
//     } catch (error) {
//         console.error('Error finding user by username:', error);
//         throw error; // Throw error if database query fails
//     }
// }

// async function findUserByEmail(email) {
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         return result.rows[0]; // Return user object if found, or undefined if not found
//     } catch (error) {
//         console.error('Error finding user by email:', error);
//         throw error; // Throw error if database query fails
//     }
// }

// module.exports = {
//     createUser,
//     findUserByUsername,
//     findUserByEmail
// };
