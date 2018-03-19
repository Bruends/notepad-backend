const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.json');

// auth middleware
module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(403).send({ error: 'no token provided' });
  }

  // check if the token format is valid
  const [scheme, token] = auth.split(' ');
  if (!scheme && !token) {
    return res.status(401).send({ error: 'token with invalid format' });
  }

  // wrong token
  await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'invalid token' });
    }

    // valid token,
    // pass the token email to request
    req.email = decoded.email;
    return next();
  });
  return null;
};
