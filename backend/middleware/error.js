const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    // Mongoose bad ObjectId -- Wrong Mongodb Id error ---> Cast Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
        error = new ErrorHandler(message, 404);
    }

    // Wrong JWT error
    if(err.name === 'JsonWebTokkenError'){
        const message = `Json Web Token Is Invalid, Try Again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expire error
    if(err.name === 'TokenExpiredError'){
        const message = `Json Web Token Is Expired, Try Again`;
        err = new ErrorHandler(message, 400);
    }
    
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorHandler(message, 400);
    }
    
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorHandler(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        // error: error.stack
    });
    }