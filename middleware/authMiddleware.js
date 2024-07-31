const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized user.' });
  }
  
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();

  } catch (e) {
    res.status(400).json({ message: 'Invalid token' });
  }

};

module.exports = authMiddleware;