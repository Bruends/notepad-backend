const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../controllers/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', userRoutes);

module.exports = app;
