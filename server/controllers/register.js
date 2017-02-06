const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');

function createToken(user) {
    return jwt.sign({ tokenId: user.id }, config.authenticationSecret, { expiresIn: config.authenticationExpiresIn });
}

router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({ email: new RegExp(req.body.email, "i") }, (error, user) => {
            if (error) res.status(500).send(error);

            if (user) {
                res.status(400).send('User already exists. Cannot create the same user again');
            } else {
                let user = new User();
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.isAdmin = false;

                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, config.saltRound);
                    user.isPasswordHashed = true;
                }

                user.save((error, newUser) => {
                    if (error) res.status(500).send(error);
                    res.status(201).json(newUser);
                });
            }
        });
    } else {
        res.status(500).send('Required parameter email and/or password is missing');
    }
});

module.exports = router;