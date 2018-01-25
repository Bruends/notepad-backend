const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notepad');
mongoose.Promise = global.Promise;

module.exports = mongoose;
