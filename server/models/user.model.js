const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['Owner', 'User'],
    default: 'User'
  },
  name: String,
  surname: String,
  phone: Number,
  email: String,
  image: String,
  frequentLocation: {
    type: String,
    default: ''
  },
  offersOwned: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
