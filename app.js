const express = require('express');
const mongoose = require('mongoose');
const makeConnection = require('./test/connection')
const app = express();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
makeConnection(app);


// routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);