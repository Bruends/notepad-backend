const mongoose = require('../config/database');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'invalid email'],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  notes: [{
    title: String,
    text: String,
  }],
});

// encripta a senha antes de salvar o novo usuário
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 8);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
