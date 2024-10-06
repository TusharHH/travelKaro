// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Create an instance of the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(morgan('dev')); // For logging requests
app.use(helmet()); // For securing HTTP headers

// MongoDB connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Define a test route
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
