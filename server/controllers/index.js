const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../config');

// Public routes
router.get('/', (req, res) => { res.render('index'); });
router.use('/api/authenticate', require('./authenticate'));
router.use('/api/register', require('./register'));

// All routes after this function are protected
router.use(function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  } else {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.authenticationSecret, function(error, decoded) {
        if (error) {
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
router.use('/api/settings/users', require('./settings/user'));
router.use('/api/settings/profiles', require('./settings/profile'));
router.use('/api/settings/notifications', require('./settings/notification'));

module.exports = router;