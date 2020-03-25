const express = require('express');
const router = express.Router();

const Offer = require('../models/offer.model')

router.get('/getAllOffers', (req, res, next) => {
    Offer.find()
        .then(allOffers => res.json(allOffers))
        .catch(err => console.log(err))
})

router.get('/getOneOffer/:id', (req, res, next) => {

    console.log('llega al back con  ->', req.params)

    Offer.findById(req.params.id)
        .populate('reservations')
        .then(theOffer => res.json(theOffer))
        .catch(err => console.log(err))

})



router.post('/new', (req, res, next) => {

    console.log(req.body)


    // const { brand, model} = 
    // const 
    const newOffer = {
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        type: req.body.type,
        description: req.body.description,
        ownerName: req.user.username,
        owner: req.user._id,
        images: req.body.images,
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

    Offer.find({ location: req.params.location })
        .populate('reservations')
        .then(theOffers => res.json(theOffers))
        .catch(err => console.log(err))
})



//UpdateAnOffer

router.post('/updateOneOffer', (req, res, next) => {

    const { brand, model, size, type, description, image, price } = req.body
    const updatedOffer = { brand, model, size, type, description, image, price }
    updatedOffer.owner = req.user._id
    updatedOffer.ownerName = req.user.username



    Offer.findByIdAndUpdate(req.body._id, updatedOffer, { new: true })
        .then(updatedOffer => res.json(updatedOffer))
        .catch(err => console.log(err))
})




module.exports = router;
