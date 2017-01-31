const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');

router.post('/', function (req, res) {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) res.status(500).send(error);

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign(
                    { _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin }, 
                    config.authenticationSecret, 
                    { expiresIn: config.authenticationExpiresIn }
                );

                res.json({ success: true, message: 'Success', token: token });
            } else {
                res.json({ success: false, message: 'Authentication failed. User not found or incorrect password.' });
            }
        } else {
            res.json({ success: false, message: 'Authentication failed. User not found or incorrect password.' });
        }
    });
});

module.exports = router;