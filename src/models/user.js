const mongoose = require('../config/database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  notes: [{
    title: { type: String, required: true },
    text: String,
    createdAt: { type: Date, default: Date.now },
  }],

});

UserSchema.pre('Save', async function (next) {
  const hash = await bcrypt.hash(this.password, 8);
  this.password = hash;
  next();
});

const User = new mongoose.Model('User', UserSchema);

module.exports = User;
