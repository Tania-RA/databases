const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const cityRoute = require("./routes/cities");
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use('/api/cities', cityRoute);

app.listen(process.env.PORT || 4000, () => { 
  console.log('Backend working..');
})