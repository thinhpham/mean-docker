const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/settings/user');

function createToken(user) {
    return jwt.sign({ tokenId: user.id }, config.authenticationSecret, { expiresIn: config.authenticationExpiresIn });
}

router.post('/', (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) res.status(500).send(error);

        var isValid = false;
        if (user && req.body.password) {
            if (user.isPasswordHashed && bcrypt.compareSync(req.body.password, user.password)) {
                isValid = true;
            } else if (req.body.password === user.password) {
                user.password = bcrypt.hashSync(req.body.password, config.saltRound);
                user.isPasswordHashed = true;
                user.save();
                isValid = true;
            }
        }

        if (isValid) {
            res.json({ success: true, message: 'Success', token: createToken(user) });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found or incorrect password.' });
        }
    });
});

module.exports = router;