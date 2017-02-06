const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const config = require('../../config');
const User = require('../../models/user');

router.get('/', (req, res) => {
    if (req.query.id) {
        User.findById(req.query.id, (error, user) => {
            if (error) res.status(500).send(error);
            res.status(200).json(user);
        });
    } else if (req.query.email) {
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

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) res.status(500).send(error);
        res.status(200).json(user);
    });
});

router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({ email: new RegExp(req.body.email, "i") }, (error, user) => {
            if (error) res.status(500).send(error);

            if (user) {
                res.status(500).send('User already exists. Cannot create the same user again');
            } else {
                let user = new User();
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.isAdmin = req.body.isAdmin;

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

router.put('/:id', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) res.status(500).send(error);

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.isAdmin = req.body.isAdmin;

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, config.saltRound);
            user.isPasswordHashed = true;
        }

        user.save((error, newUser) => {
            if (error) res.status(500).send(error);
            res.status(201).json(newUser);
        });
    });
});

module.exports = router;