const app = require('./app');
const dotenv = require('dotenv');
const connectToMongoDB = require('./config/database');

// Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});


// Load environment variables from .env file
dotenv.config({ path: 'backend/config/config.env'});


// Connect to MongoDB
connectToMongoDB();

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});

// Unhandled Promise Rejection Error
process.on("unhandledRejection", err => {
    console.log(`Unhandled Rejection Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');
    
    server.close(() => {
        process.exit(1);
    });
});