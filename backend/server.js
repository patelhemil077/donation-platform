// File: backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors()); // Allow Cross-Origin requests
app.use(express.json()); // Parse JSON bodies

// Import payment route
const paymentRoute = require('./routes/payment');
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
