// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Offer = require("../models/offer.model")

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let offers = [
  {
    brand: 'Burton',
    model: 'Instigator',
    size: 161,
    type: 'Snowboard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271664/offers/Burton%20Instigator.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271664/offers/Burton%20Instigator.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271664/offers/Burton%20Instigator.jpg.jpg'
    ]
  }
  ,
  {
    brand: 'Burton',
    model: 'Circuit',
    size: 158,
    type: 'Snowboard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583272698/offers/rossignol-circuit.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271664/offers/Burton%20Instigator.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583272698/offers/rossignol-circuit.jpg.jpg'
    ]
  }
  ,
  {
    brand: 'Burton',
    model: 'Kilroy',
    size: 146,
    type: 'Snowboard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271745/offers/Burton-kilroy.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583272698/offers/rossignol-circuit.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583272698/offers/rossignol-circuit.jpg.jpg'
    ]
  }
  ,
  {
    brand: 'Rossignol',
    model: 'Race Shot',
    size: 156,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: [
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271113/offers/Salomon%20-%20Race%20Shot.jpeg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583272698/offers/rossignol-circuit.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271113/offers/Salomon%20-%20Race%20Shot.jpeg.jpg']
  }
  ,
  {
    brand: 'Rossignol',
    model: 'Hero',
    size: 177,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271448/offers/Rossignol%20Hero.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271448/offers/Rossignol%20Hero.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271448/offers/Rossignol%20Hero.jpg.jpg'
    ]
  }
  ,
  {
    brand: 'Elan',
    model: 'SLX',
    size: 174,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg']
  }, {
    brand: 'Rossignol',
    model: 'Hero',
    size: 177,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Formigal',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271448/offers/Rossignol%20Hero.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg'
    ]
  }
  ,
  {
    brand: 'Elan',
    model: 'SLX',
    size: 174,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Formigal',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583271570/offers/Elan%20SLX.jpg.jpg'
    ]
  }
]

Offer.create(offers)
  .then(() => console.log(`${offers.length} offers created`))
  .catch(err => console.log(err))

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })