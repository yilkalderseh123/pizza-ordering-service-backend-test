// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Sequelize instance
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

// Sync database and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
