const express = require('express');
const app = express();
const cors = require('cors');

// import Routes
const productRoute = require('./routes/productRoute');

// parse json to body 
app.use(express.json());

// allow cross-origin requests
app.use(cors());

// use routes
app.use('/api/v1', productRoute);



module.exports = app;