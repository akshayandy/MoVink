const express = require('express');
const moviesRoutes = express.Router();
const movDAO = require('../dao/movies.dao');


//get all movies
moviesRoutes.get('/', async function(req, res){
    const rows = await movDAO.getAllMovies();
    res.send(rows);
})

//Create New user
moviesRoutes.post("/", async function (req, res) {
    //Validate
    if (!req.body || req.body == {}) {
        res.status(400).send();
        return;
    }
    //Add it to our database
    const user = await movDAO.addUser(req.body);
    //As a form of Confirmation, let's send back the added employee.
    res.send(user);
})

module.exports = moviesRoutes