const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({

  brand: String,
  model: String,
  size: Number,
  type: {
    type: String,
    enum: ['Skis', 'Snowboard',],
    default: 'Skis'
  },
  image: String,
  description: String,
  ownerName: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
