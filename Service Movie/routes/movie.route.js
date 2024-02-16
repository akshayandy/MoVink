const express = require('express');
const moviesRoutes = express.Router();
const movDAO = require('../dao/movies.dao');


//get all movies
moviesRoutes.get('/', async function(req, res){
    const rows = await movDAO.getAllMovies();
    res.send(rows);
})


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