const pool = require('../db-connect');


async function userVerify(email, password){
    try {
        // Perform database query to add movie to cart
        const query = `
            SELECT * FROM users WHERE email = $1 AND password = $2`;

        const values = [email, password];
        const result = await pool.query(query, values);

        return result.rows[0]; // Return the added movie if needed
    } catch (error) {
        console.error('Error adding movie to cart:', error);
        throw error;
    }
}


// Function to Register User
async function registerUser(name, email, password) {
    try {
        // Perform database query to add movie to cart
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`;

        const values = [name, email, password];
        const result = await pool.query(query, values);

        return result.rows[0]; // Return the added movie if needed
    } catch (error) {
        console.error('Error Registering new User', error);
        throw error;
    }
}

// Function to check if an email is already registered
async function isEmailRegistered(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
}


module.exports = {
    isEmailRegistered: isEmailRegistered,
    registerUser : registerUser,
    userVerify : userVerify
}