const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation.models')
const Offer = require('../models/offer.model')
const User = require('../models/user.model')

router.post('/new', (req, res, next) => {


    const { startDate, endDate, ownerId, offerId } = req.body
    const newReservation = {
        startDate,
        endDate,
        ownerId,
        clientId: req.user._id,
        offerId,
    }

    Reservation.create(newReservation)
        .then(reservation => {
            const promiseOffer = Offer.findByIdAndUpdate(req.body.offerId, { $push: { reservations: reservation._id } }, { new: true }).populate('reservations')
            const promiseUser = User.findByIdAndUpdate(req.user._id, { $push: { reservations: reservation._id } }, { new: true })
            return Promise.all([promiseOffer, promiseUser])
        })
        .then(result => res.json(result[0]))
        .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {

    const promiseArr = []
    req.body.map((elm, idx) => {
        idx = Reservation.findById(elm).populate('offerId')
        promiseArr.push(idx)
    })

    Promise.all(promiseArr)
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))

})

module.exports = router;
