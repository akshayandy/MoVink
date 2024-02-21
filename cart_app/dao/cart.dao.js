const pool = require('../db-connect');

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


module.exports = {
    getCartData : getCartData,
    addMovie : addToCart,
    deleteMovie : removeFromCart,
    emptyCart : emptyCart
}