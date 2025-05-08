const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const todoRoutes = require('./routes/todos');

// Initialize express
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API' });
});

// Use routes
app.use('/api', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});