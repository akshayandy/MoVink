// movies.dao.js

const pool = require('../db-connect');
// const bcrypt = require('bcrypt');

//Movies
async function selectAllMovies(){
    const sql = "SELECT * FROM movies_data;"

    const result = await pool.query(sql);

    return result.rows.map(row => convertMovieData(row));
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