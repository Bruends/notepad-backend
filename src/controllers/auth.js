const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const secret = require('../config/secret.json').secret;

const generateToken = async (params = {}, secret) => {
  const token = await jwt.sign(params, secret, {expiresIn: 86400});
  return 'Bearer ' + token;
}

// rota de autenticação
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email })
    .select('+password');

  if(!user) {
    return res.status(400).send({ error: 'user not found' });
  }

  if(!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'invalid password' });
  }

  res.send({
    user,
    token: await generateToken({email: user.email}, secret)
  });
});

//registro
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
        token: await generateToken({ email: user.email }, secret)
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ error: 'insert a valid e-mail' });
      }

      return res.status(400).send({ error: err});
    }
  });

module.exports = router;
