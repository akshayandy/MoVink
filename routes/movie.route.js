const express = require('express');
const moviesRoutes = express.Router();
const movDAO = require('../dao/movies.dao');


//get all movies
moviesRoutes.get('/', async function(req, res){
    const rows = await movDAO.getAllMovies();
    res.send(rows);
})

// Route to add movie to cart
moviesRoutes.post('/cart', async (req, res) => {
    try {
        // Extract movie details from request body
        const {title, price, rating, image } = req.body;

        // Add movie to cart
        const result = await movDAO.addMovie(title, price, rating, image);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding movie to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to fetch cart data
moviesRoutes.get('/cart', async (req, res) => {
    try {
        // Your code to fetch cart data from the database
        const cartData = await movDAO.getCartData(); // Assuming you have a function to fetch cart data in your DAO
        
        // Send the cart data in the response
        res.status(200).json(cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to remove movie from cart
moviesRoutes.delete('/cart/:movieId', async (req, res) => {
    try {
        // Extract movie ID from request params
        const movieId = req.params.movieId;

        // Remove movie from cart
        await movDAO.deleteMovie(movieId);

        res.status(200).json({ message: 'Movie removed from cart successfully' });
    } catch (error) {
        console.error('Error removing movie from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = moviesRoutes