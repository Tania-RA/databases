const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookie = require('cookie-parser');
const bodyParser= require('body-parser');
require('dotenv').config();

const app = express();

const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const itemRoute = require("./routes/item");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookie());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));



const port = process.env.PORT;



app.use('/api/user', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/item', itemRoute);

app.listen(port, () => console.log(`Server Started on port ${port}...`));
