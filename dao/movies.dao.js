const pool = require('../db-connect');
const bcrypt = require('bcrypt');


//Movies
async function selectAllMovies(){
    const sql = "SELECT * FROM movies_data;"

    const result = await pool.query(sql);

    return result.rows.map(row => convertMovieData(row));
}

// users
async function createUser(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users_data (user_name, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        return true; // Return true if user creation is successful
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Throw error if user creation fails
    }
}

async function findUserByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]; // Return user object if found, or undefined if not found
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error; // Throw error if database query fails
    }
}

//-----------------------------------------------------------------////
function convertMovieData(data){
    if (!data || data == Object.keys(data).length === 0) {
        return {};
    }
    return {
        id: data.id,
        title: data.title,
        rating: data.rating,
        price: Number(data.price),
        image: (data.image)
    }

}

module.exports = {
    getAllMovies : selectAllMovies,
    addUser : createUser,
    getUser : findUserByEmail
}