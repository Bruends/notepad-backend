const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const { secret } = require('../config/secret.json');

// generate JWT token
const generateToken = async (params = {}, secretKey) => {
  const token = await jwt.sign(params, secretKey, { expiresIn: 86400 });
  return token;
};

// auth routes
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email })
    .select('+password');

  if (!user) {
    return res.status(400).send({ error: 'user not found' });
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'invalid password' });
  }

  return res.send({
    user,
    token: await generateToken({ email: user.email }, secret),
  });
});

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'insert email and password' });
  }

  const newUser = {
    email,
    password,
    notes: [],
  };

  try {
    const user = await userModel.create(newUser);
    return res.send({
      user,
      token: await generateToken({ email: user.email }, secret),
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ error: 'Insert a valid e-mail' });
    }

    if (err.code === 11000) {
      return res.status(400).send({ error: 'E-mail already registered' });
    }

    return res.status(400).send({ error: 'Error on register' });
  }
});

module.exports = router;
