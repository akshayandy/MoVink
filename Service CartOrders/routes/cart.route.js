const express = require('express');
const cartRoutes = express.Router();
const carDAO = require('../dao/cart.dao');


// Add a route to fetch cart data
cartRoutes.get('/', async (req, res) => {
    try {
        // Your code to fetch cart data from the database
        const cartData = await carDAO.getCartData(); // Assuming you have a function to fetch cart data in your DAO
        
        // Send the cart data in the response
        res.status(200).json(cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add movie to cart
cartRoutes.post('/', async (req, res) => {
    try {
        // Extract movie details from request body
        const {title, price, rating, image } = req.body;

        // Add movie to cart
        const result = await carDAO.addMovie(title, price, rating, image);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding movie to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to remove movie from cart
cartRoutes.delete('/:movieId', async (req, res) => {
    try {
        // Extract movie ID from request params
        const movieId = req.params.movieId;

        // Remove movie from cart
        await carDAO.deleteMovie(movieId);

        res.status(200).json({ message: 'Movie removed from cart successfully' });
    } catch (error) {
        console.error('Error removing movie from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = cartRoutes