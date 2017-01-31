const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const config = require('../config');
const User = require('../models/user');

router.get('/', (req, res) => {
    if (req.query.email) {
        User.findOne({ email: new RegExp(req.query.email, "i") }, (error, user) => {
            if (error) res.status(500).send(error);
            res.status(200).json(user);
        });
    } else {
        User.find({}, (error, users) => {
            if (error) res.status(500).send(error);
            res.status(200).json(users);
        });
    }
});

router.post('/', (req, res) => {
    if (req.body.email) {
        User.findOne({ email: new RegExp(req.body.email, "i") }, (error, user) => {
            if (user) {
                res.status(500).send('User already exists. Cannot create the same user again');
            } else {
                let user = new User();
                if (req.body.firstName) user.firstName = req.body.firstName;
                if (req.body.lastName) user.lastName = req.body.lastName;
                if (req.body.email) user.email = req.body.email;
                if (req.body.isAdmin) user.isAdmin = req.body.isAdmin;

                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, config.saltRound);
                    user.isPasswordHashed = true;
                }

                var date = new Date();
                user.createdOn = date;
                user.updatedOn = date;

                user.save((error, newUser) => {
                    if (error) res.status(500).send(error);
                    res.status(201).json(newUser);
                });
            }
        });
    } else {
        res.status(500).send('Required parameter email is missing');
    }
});

module.exports = router;