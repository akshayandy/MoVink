const express = require('express');
const cors = require('cors');
const moviesRoutes = require("./routes/movie.route")
const app = express();
const port = 5432;

app.use(express.json()); // <=== parse the request body as JSON
app.use(cors());


app.use("/", moviesRoutes);

app.listen(port, ()=>{
    console.log(`movies-app is listening on port ${port}`);
    console.log(`You can start using the app at: http://localhost:${port}/`)
})