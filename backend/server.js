const app = require('./app');
const dotenv = require('dotenv');
const connectToMongoDB = require('./config/database');

// Load environment variables from .env file
dotenv.config({ path: 'backend/config/config.env'});

// Connect to MongoDB
connectToMongoDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});