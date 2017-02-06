const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const config = require('../../config');
const Notification = require('../../models/notification');

router.get('/:userId', (req, res) => {
    if (req.params.userId) {
        Notification.findOne({ userId: req.params.userId }, (error, item) => {
            if (error) res.status(500).send(error);
            res.status(200).json(item);
        });
    }
});

router.post('/', (req, res) => {
    if (req.body.userId) {
        item = new Notification();
        item.userId = req.body.userId;
        item.isReceiveCommunication = req.body.isReceiveCommunication;
        item.isReceivePartnersCommunication = req.body.isReceivePartnersCommunication;

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
        Notification.findOne({ userId: req.body.userId }, (error, item) => {
            if (error) res.status(500).send(error);

            if (item) {
                item.isReceiveCommunication = req.body.isReceiveCommunication;
                item.isReceivePartnersCommunication = req.body.isReceivePartnersCommunication;

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