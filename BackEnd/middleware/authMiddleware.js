const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'c9e6f7ab4df34b1a8ed0e9038cf2f0b65a6d9d4c0a761cde09e8c3494d8cf0ab2');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

const user = (req, res, next) => {
  if (req.user && req.user.role === 'applicationUser') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as Application User' });
  }
};

module.exports = {
  protect,
  admin,
  user
};
