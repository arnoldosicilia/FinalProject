const express = require('express');
const router = express.Router();

const Offer = require('../models/offer.model')

router.get('/getAllOffers', (req, res, next) => {
    Offer.find()
        .then(allOffers => res.json(allOffers))
        .catch(err => console.log(err))
})

router.get('/getOneCoaster/:id', (req, res, next) => {
    Offer.findById(req.params.id)
        .then(theOffer => res.json(theOffer))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Offer.create(req.body)
        .then(theOffer => res.json(theOffer))
        .catch(err => console.log(err))
})
module.exports = router;
