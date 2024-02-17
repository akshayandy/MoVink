const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRoutes = require("./routes/cart.route")
const port = 3000;
const app = express();



app.use(express.json()); // <=== parse the request body as JSON
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", cartRoutes);
app.use("/:movieId", cartRoutes);


app.listen(port, ()=>{
    console.log(`movies-app is listening on port ${port}`);
    console.log(`You can start using the app at: http://localhost:${port}/`)
})