const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notepad', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
