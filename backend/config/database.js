const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: 'backend/config/config.env'});

// Connect to MongoDB
const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    }).catch(err => {
        console.log(err);
    }
    )
}

module.exports = connectToMongoDB;
