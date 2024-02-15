// movies.dao.js

const pool = require('../db-connect');
// const bcrypt = require('bcrypt');

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

//Movies
async function selectAllMovies(){
    const sql = "SELECT * FROM movies_data;"

    const result = await pool.query(sql);

    return result.rows.map(row => convertMovieData(row));
}

// Function to fetch cart data from the database
async function getCartData() {
    try {
        const query = `
            SELECT * FROM cart;`;
        const result = await pool.query(query);

        return result.rows; // Return the cart data
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}

// Function to add movie to cart
async function addToCart(title, price, rating, image) {
    try {
        // Perform database query to add movie to cart
        const query = `
            INSERT INTO cart (movie_id, title, price, rating, image)
            VALUES ((SELECT id FROM movies_data WHERE title = $1), $1, $2, $3, $4)
            RETURNING *;`;

        const values = [title, price, rating, image];
        const result = await pool.query(query, values);

        return result.rows[0]; // Return the added movie if needed
    } catch (error) {
        console.error('Error adding movie to cart:', error);
        throw error;
    }
}

// Function to remove movie from cart
async function removeFromCart(movieId) {
    try {
        // Perform database query to remove movie from cart by movie ID
        const query = `
            DELETE FROM cart
            WHERE movie_id = $1;`;

        const values = [movieId];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error removing movie from cart:', error);
        throw error;
    }
}

// Function to empty the cart
async function emptyCart() {
    try {
        // Perform database query to delete all records from the cart table
        const query = `
            DELETE FROM cart;`;

        await pool.query(query);
    } catch (error) {
        console.error('Error emptying cart:', error);
        throw error;
    }
}

// Function to insert movie into orders table
async function addOrder(movie) {
    try {
        // Perform database query to insert movie into orders table
        const query = `
            INSERT INTO orders (movie_id, title, price, rating, image)
            VALUES ($1, $2, $3, $4, $5);`;

        const values = [movie.movie_id, movie.title, movie.price, movie.rating, movie.image];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error adding movie to orders:', error);
        throw error;
    }
}

async function getOrdersData() {
    try {
        const query = `
            SELECT * FROM orders;`;
        const result = await pool.query(query);

        return result.rows; // Return the orders data
    } catch (error) {
        console.error('Error fetching orders data:', error);
        throw error;
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
    getCartData : getCartData,
    getAllMovies : selectAllMovies,
    addMovie : addToCart,
    deleteMovie : removeFromCart,
    emptyCart : emptyCart,
    addOrder : addOrder,
    isEmailRegistered: isEmailRegistered,
    registerUser : registerUser,
    getOrdersData : getOrdersData,
    userVerify : userVerify
}