const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new Unauthorized('Необходима авторизация');
};

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.dir(token);
//   const { authorization } = req.headers;
// console.log(authorization);
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация' });
//   }

//   const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt_secret');
    console.log(payload);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

module.exports = auth;