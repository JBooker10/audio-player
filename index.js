const express = require('express');
const bodyParser = require('body-parser');
const expressMongoDB =  require('express-mongo-db');
const app = express();
const port = 3400;
require('dotenv').config();

const tracks = require('./routes/api/tracks');


// body-parser and mongoDB connection middleware to Music_Player database
app.use(expressMongoDB(process.env.MONGODBCONNECTION))
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/tracks', tracks);


app.listen(port, () => console.log(`Port is listening on ${port}`))
