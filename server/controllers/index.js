const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../config');

// Public routes
router.get('/', (req, res) => { res.render('index'); });
router.use('/api/authenticate', require('./authenticate'));

// All routes after this function are protected
router.use(function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  } else {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.authenticationSecret, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Invalid authentication token provided.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No authentication token provided.'
      });
    }
  }
});

// Protected routes
router.use('/api/heroes', require('./hero'));
router.use('/api/users', require('./user'));

module.exports = router;