const dotenv = require('dotenv');
dotenv.config(); // Load env variables first!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./config/passport'); // Load passport strategy AFTER env vars are loaded

const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/auth'); // <-- Add auth routes here
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware (make sure to use SESSION_SECRET from .env)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-if-not-set',
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Register auth routes BEFORE protected routes so they are publicly accessible
app.use('/auth', authRoutes);

// Import authentication middleware
const ensureAuthenticated = require('./middleware/auth');

// Protect sensitive routes with authentication middleware
app.use('/api/books', ensureAuthenticated, bookRoutes);
app.use('/api/authors', ensureAuthenticated, authorRoutes);

// Swagger docs (public)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));
