const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation.models')
const Offer = require('../models/offer.model')

router.post('/new', (req, res, next) => {


    const { startDate, finishDate, ownerId, offerId } = req.body
    const newReservation = {
        startDate,
        finishDate,
        ownerId,
        clientId: req.user._id,
        offerId,
    }



    console.log('Llega al back sin problema y esta es la reserva', newReservation)

    Reservation.create(newReservation)
        .then(reservation => {
            console.log(reservation)
            console.log(reservation._id)
            Offer.findByIdAndUpdate(req.body.offerId, { $push: { reservations: reservation._id } })
                .populate('reservations')
                .then(response => res.json(response))
        })
        .catch(err => console.log(err))


})

module.exports = router;
