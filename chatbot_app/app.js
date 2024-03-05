const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatbotRoutes = require("./routes/chatbot.route")
const port = 8080;
const app = express();

app.use(express.json()); // <=== parse the request body as JSON
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/", chatbotRoutes);

app.listen(port, ()=>{
    console.log(`MoVink is listening on port ${port}`);
    console.log(`You can start using the app at: http://localhost:${port}/`)
})