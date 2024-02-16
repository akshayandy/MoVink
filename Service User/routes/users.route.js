const express = require('express');
const usersRoutes = express.Router();
const usrDAO = require('../dao/users.dao');


// Handle sign-in POST requests
usersRoutes.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await usrDAO.userVerify(email, password);
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
usersRoutes.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the username and email are unique
        const emailRegistered = await usrDAO.isEmailRegistered(email);
        if (emailRegistered) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // and insert the new user if the username and email are unique
        const result = await usrDAO.registerUser(name, email, password);
        return res.status(201).json(result);

    } catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
});


module.exports = usersRoutes