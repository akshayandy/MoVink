const express = require('express');
const moviesRoutes = express.Router();
const movDAO = require('../dao/movies.dao');

// Handle sign-in POST requests
moviesRoutes.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await movDAO.userVerify(email, password);
        // Example authentication logic
        if (result) {
            // User found, send success response
            res.send(result);
            // res.status(200).send('Sign-in successful!');
        } else {
            // User not found or incorrect password, send error response
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle sign-up POST requests
moviesRoutes.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the username and email are unique
        const emailRegistered = await movDAO.isEmailRegistered(email);
        if (emailRegistered) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // and insert the new user if the username and email are unique
        const result = await movDAO.registerUser(name, email, password);
        return res.status(201).json(result);

    } catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
});

//get all movies
moviesRoutes.get('/', async function(req, res){
    const rows = await movDAO.getAllMovies();
    res.send(rows);
})

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


moviesRoutes.post('/orders', async (req, res) => {
    try {
        // Extract cart data from the request body
        const cartData = req.body;

        // Insert each movie in the cart into the orders table
        for (const movie of cartData) {
            await movDAO.addOrder(movie);
        }

        await movDAO.emptyCart();

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to fetch orders data
moviesRoutes.get('/orders', async (req, res) => {
    try {
        // Your code to fetch orders data from the database
        const ordersData = await movDAO.getOrdersData(); // Assuming you have a function to fetch orders data in your DAO
        
        // Send the orders data in the response
        res.status(200).json(ordersData);
    } catch (error) {
        console.error('Error fetching orders data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = moviesRoutes