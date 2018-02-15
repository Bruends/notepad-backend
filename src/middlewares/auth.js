const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.json');

// middleware autenticação
module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  // token não fornecido
  if (!auth) {
    return res.status(403).send({ error: 'no token provided' });
  }

  // token em formato invalido
  const [scheme, token] = auth.split(' ');
  if (!scheme && !token) {
    return res.status(401).send({ error: 'invalid token' });
  }

  // token invalido
  await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'wrong token' });
    }

    // token valido,
    // passa o email para a request e passa para a proxima etapa
    req.email = decoded.email;
    return next();
  });
  return null;
};
