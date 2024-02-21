// movies.dao.js

const pool = require('../db-connect');
// const bcrypt = require('bcrypt');

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

module.exports = {
    addOrder : addOrder,
    getOrdersData : getOrdersData
}