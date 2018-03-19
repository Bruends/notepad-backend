const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('../controllers/auth');
const notesRoutes = require('../controllers/notes');
const authMiddleware = require('../middlewares/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use('/auth', userRoutes);
app.use('/notes', authMiddleware);
app.use('/notes', notesRoutes);

module.exports = app;
