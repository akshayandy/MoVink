const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moviesRoutes = require("./routes/movie.route")
const port = 2000;
const app = express();



app.use(express.json()); // <=== parse the request body as JSON
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", moviesRoutes);


app.listen(port, ()=>{
    console.log(`movies-app is listening on port ${port}`);
    console.log(`You can start using the app at: http://localhost:${port}/`)
})


