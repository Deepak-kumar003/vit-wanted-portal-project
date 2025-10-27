// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(cors());

// NEW: Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5001;

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the VIT Wanted Portal API!' });
});

// NEW: Use the user routes
// Any request to /api/users will be handled by our userRoutes file
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});