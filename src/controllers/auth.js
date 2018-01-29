const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/');
const secret = require('../config/secret.json').secret;

const generateToken = (params = {}, secret) => {
  return await jwt.sign(params, secret, {expiresIn: 86400});
}

// rota de autenticação
router.post('authenticate/', async (req, res) => {
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

module.exports = router;
