const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.json');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ error: 'no token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'invalid token' });
    }

    req.userEmail = decoded.email;
    return next();
  });
};
