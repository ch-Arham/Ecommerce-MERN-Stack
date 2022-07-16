const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middleware/error');

// import Routes
const productRoute = require('./routes/productRoute');

// parse json to body 
app.use(express.json());

// allow cross-origin requests
app.use(cors());

// use routes
app.use('/api/v1', productRoute);

// Middleware for Error Handling
app.use(errorMiddleware)



module.exports = app;