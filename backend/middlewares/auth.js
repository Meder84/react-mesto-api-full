const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET = '04054c0a-e5f0-43e0-9b89-7862898c59bd' } = process.env;

const handleAuthError = () => {
  throw new Unauthorized('Необходима авторизация');
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
