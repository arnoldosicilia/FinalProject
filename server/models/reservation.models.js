const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  startDate: Date,
  finishDate: Date,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  clientId: { type: Schema.Types.ObjectId, ref: 'User' },
  offerId: { type: Schema.Types.ObjectId, ref: 'Offer' },

});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
