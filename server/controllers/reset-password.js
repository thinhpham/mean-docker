const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const User = require('../models/user');
const config = require('../config');

function createToken(user) {
    return jwt.sign({ tokenId: user.id }, config.authenticationSecret, { expiresIn: config.authenticationExpiresIn });
}

router.post('/request', (req, res) => {
    if (req.body.email) {
        User.findOne({ email: new RegExp(req.body.email, "i") }, (error, user) => {
            if (error) res.status(500).send(error);

            if (user) {
                let uniqueId = randomstring.generate({length: 39, readable: true, capitalization: 'lowercase'});
                let bodyTemplate = `Hello,

There was a recent request to change the password on your account. Click the link below to confirm this change:

${config.clientWebUrl}/reset-password/${uniqueId}

Didn't ask to reset your password? If you didn't ask for your password, it's likely that another user entered your username or email address by mistake while trying to reset their password. If that's the case, you don't need to take any further action and can safely disregard this email.
                `;

                let mailOptions = {
                    from: process.env.smtpFromAddress || config.smtpFromAddress,
                    to: req.body.email,
                    subject: 'Password reset requested',
                    text: bodyTemplate
                };

                let transporter = nodemailer.createTransport({
                    service: process.env.smtpTransportService || config.smtpTransportService,
                    auth: {
                        user: process.env.smtpUsername || config.smtpUsername,
                        pass: process.env.smtpPassword || config.smtpPassword
                    }
                });

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) res.status(500).send(error);

                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.status(200).json('Please check your email for instruction on resetting your password');
                });

            } else {
                res.status(500).send('Cannot find user');
            }
        });
    } else {
        res.status(500).send('Required parameter email and/or password is missing');
    }
});

router.post('/set-new/:id', (req, res) => {
    if (req.params.id && req.body.password && req.body.confirm) {
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