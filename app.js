// inbuilt imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// user imports
const makeConnection = require('./test/connection')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { checkUser } = require('./middleware/authMiddleware');

// app initialization
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
makeConnection(app);

// routes
app.get('*', checkUser);
app.use(userRoutes);
app.use(authRoutes);