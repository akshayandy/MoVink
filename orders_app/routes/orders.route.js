const express = require('express');
const ordersRoutes = express.Router();
const ordDAO = require('../dao/orders.dao');


ordersRoutes.post('/', async (req, res) => {
    try {
        // Extract cart data from the request body
        const cartData = req.body;

        // Insert each movie in the cart into the orders table
        for (const movie of cartData) {
            await ordDAO.addOrder(movie);
        }

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to fetch orders data
ordersRoutes.get('/', async (req, res) => {
    try {
        // Your code to fetch orders data from the database
        const ordersData = await ordDAO.getOrdersData(); // Assuming you have a function to fetch orders data in your DAO
        
        // Send the orders data in the response
        res.status(200).json(ordersData);
    } catch (error) {
        console.error('Error fetching orders data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = ordersRoutes