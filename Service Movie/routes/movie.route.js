const express = require('express');
const moviesRoutes = express.Router();
const movDAO = require('../dao/movies.dao');


//get all movies
moviesRoutes.get('/', async function(req, res){
    const rows = await movDAO.getAllMovies();
    res.send(rows);
})


module.exports = moviesRoutes