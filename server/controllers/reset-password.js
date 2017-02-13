const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const jade = require('jade');

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
                // Get random id
                let uniqueId = randomstring.generate({length: 39, readable: true, capitalization: 'lowercase'});

                // Update user with random id
                user.resetPasswordId = uniqueId;
                user.save((error, user) => {
                    // Send email
                    let data = {clientWebUrl: config.clientWebUrl, uniqueId: uniqueId};
                    jade.renderFile(config.projectDir + '/templates/reset-password.jade', data, (error, html) => {
                        let mailOptions = {
                            from: process.env.smtpFromAddress || config.smtpFromAddress,
                            to: req.body.email,
                            subject: 'Password reset requested',
                            html: html
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
                            if (info) console.log('Message %s sent: %s', info.messageId, info.response);
                            res.status(200).json({ message: 'Password reset have been submitted. Please check your email to continue' });
                        });
                    });
                });
            } else {
                res.status(500).send('Cannot find user using the email address you provided');
            }
        });
    } else {
        res.status(500).send('Required parameter email and/or password is missing');
    }
});

router.post('/set-new/:id', (req, res) => {
    if (req.params.id && req.body.password && req.body.confirm) {
        User.findOne({ resetPasswordId: req.params.id }, (error, user) => {
            if (error) res.status(500).send(error);

            if (user) {
                if (req.body.password == req.body.confirm) {
                    user.password = bcrypt.hashSync(req.body.password, config.saltRound);
                    user.isPasswordHashed = true;
                    user.resetPasswordId = null;

                    user.save((error, newUser) => {
                        if (error) res.status(500).send(error);
                        res.status(200).json({ message: 'New password set successfully. You can use it to login now' });
                    });
                }
            }
        });
    } else {
        res.status(500).send('Required parameter email and/or password is missing');
    }
});

module.exports = router;