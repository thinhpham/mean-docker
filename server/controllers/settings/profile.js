const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const config = require('../../config');
const Profile = require('../../models/settings/profile');

router.get('/:userId', (req, res) => {
    if (req.params.userId) {
        Profile.findOne({ userId: req.params.userId }, (error, item) => {
            if (error) res.status(500).send(error);
            res.status(200).json(item);
        });
    }
});

router.post('/', (req, res) => {
    if (req.body.userId) {
        item = new Profile();
        item.userId = req.body.userId;
        item.phone = req.body.phone;
        item.address = req.body.address;
        item.city = req.body.city;
        item.state = req.body.state;
        item.postalCode = req.body.postalCode;
        item.country = req.body.country;

        item.save((error, newItem) => {
            if (error) res.status(500).send(error);
            res.status(201).json(newItem);
        });
    } else {
        res.status(500).send('Required parameter userId is missing');
    }
});

router.put('/', (req, res) => {
    if (req.body.userId) {
        Profile.findOne({ userId: req.body.userId }, (error, item) => {
            if (error) res.status(500).send(error);

            if (item) {
                item.phone = req.body.phone;
                item.address = req.body.address;
                item.city = req.body.city;
                item.state = req.body.state;
                item.postalCode = req.body.postalCode;
                item.country = req.body.country;

                item.save((error, newItem) => {
                    if (error) res.status(500).send(error);
                    res.status(201).json(newItem);
                });
            }
        });
    } else {
        res.status(500).send('Required parameter userId is missing');
    }
});

module.exports = router;