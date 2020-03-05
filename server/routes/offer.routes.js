const express = require('express');
const router = express.Router();

const Offer = require('../models/offer.model')

router.get('/getAllOffers', (req, res, next) => {
    Offer.find()
        .then(allOffers => res.json(allOffers))
        .catch(err => console.log(err))
})

router.get('/getOneOffer/:id', (req, res, next) => {
    Offer.findById(req.params.id)
        .then(theOffer => res.json(theOffer))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    const newOffer = {
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        type: req.body.type,
        description: req.body.description,
        ownerName: req.user.username,
        owner: req.user._id,
        image: req.body.image,
    }

    Offer.create(newOffer)
        .then(theOffer => res.json(theOffer))
        .catch(err => console.log(err))
})

router.get('/owner/:ownerId', (req, res, netx) => {

    Offer.find({ owner: req.params.ownerId })
        .then(theOffers => res.json(theOffers))
        .catch(err => console.log(err))

})


router.get('/getOffersByLocation/:location', (req, res, netx) => {

    console.log('se llama al back')
    Offer.find({ location: req.params.location })
        .then(theOffers => res.json(theOffers))
        .catch(err => console.log(err))

})


module.exports = router;
