require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();

app.use(express.json());
app.use(logger);

// Premium Frontend Static Serve
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});