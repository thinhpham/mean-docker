const express = require('express');
const router = express.Router();

const Hero = require('../models/hero');

router.get('/', (req, res) => {
    if (req.query.name) {
        Hero.find({name: new RegExp(req.query.name, "i")}, (error, heroes) => {
            if (error) res.status(500).send(error);
            res.status(200).json(heroes);
        });
    } else {
        Hero.find({}, (error, heroes) => {
            if (error) res.status(500).send(error);
            res.status(200).json(heroes);
        });
    }
});

router.get('/:id', (req, res) => {
    Hero.findById(req.params.id, (error, hero) => {
        if (error) res.status(500).send(error);
        res.status(200).json(hero);
    });
});

router.post('/', (req, res) => {
    let hero = new Hero();
    if (req.body.name) hero.name = req.body.name;
    if (req.body.age) hero.age = req.body.age;

    hero.save((error, newHero) => {
        if (error) res.status(500).send(error);
        res.status(201).json(newHero);
    });
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hero.findByIdAndUpdate(id, body, (error, hero) => {
        if (error) res.status(500).send(error);

        if (!hero) {
            return res.status(404).json({
                message: 'Hero with id ' + id + ' can not be found.'
            });
        }

        res.json(hero);
    });
});

router.delete('/:id', (req, res) => {
    Hero.findByIdAndRemove(req.params.id, (error, hero) => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Hero deleted successfully'
        });
    });
});

module.exports = router;