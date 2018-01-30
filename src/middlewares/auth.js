const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.json');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(403).send({ error: 'no token provided' });
  }

  const [scheme, token] = auth.split(' ');
  if (!scheme && !token) {
    return res.status(401).send({ error: 'invalid token' });
  }

  await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(token);
      return res.status(401).send({ error: 'wrong token' });
    }

    req.email = decoded.email;
    next();
  });
};
