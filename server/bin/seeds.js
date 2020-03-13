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
  .connect(`${process.env.DB_REMOTE}`, { useNewUrlParser: true, useUnifiedTopology: true })
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
    brand: 'Atomic',
    model: 'G-H',
    size: 181,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/001Atomic_Front_181_l0f3hu.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/001Atomic_Back_pdgfye.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/001Atomic_Fijaciones_hrtipu.webp',
    ],
    reservations: [],
    direction: 'Beret Cota 1500, 25598 Baqueira, Lleida',
  }
  ,
  {
    brand: 'Rossignol',
    model: 'Ozuna',
    size: 160,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: [['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/002Rossignol_Front_160_hfa6mp.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/002Rossignol_Back_w73u9t.webp',
    ]],
    reservations: []
    ,
    direction: 'Parking Pleta Val de Ruda, Baqueira, 25598, Lleida',
  }
  ,
  {
    brand: 'Volki',
    model: 'AC-Pro',
    size: 163,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Baqueira',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/003Volki_Front_163_x8vs9z.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/003Volki_ojvtkd.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946026/003Volki_Back_nog1xf.webp',
    ],
    reservations: [],
    direction: 'Edificio 25598, Bonaigua Baqueira, 14, 25598 Baqueira, Lleida',
  }
  ,
  {
    brand: 'Atomic',
    model: 'RTX',
    size: 160,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Andorra',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/004Atomic_Front_160_rxtmlc.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/004Atomic_fz2xnv.webp',
    ],
    reservations: [],
    direction: 'Carrer Dr. Nequi, 12, AD500 Andorra la Vella, Andorra',
  },
  {
    brand: 'Volki',
    model: 'VxJ',
    size: 159,
    type: 'Skis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
    price: 10,
    location: 'Andorra',
    ownerName: 'Arnoldo',
    image: ['https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/005Volki_Front_159_detodv.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/005Volki_model_nhzg8r.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/005Volki_Tail_zsbd5o.webp,',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/005Volki_Fijaciones_ozjxdm.webp',
      'https://res.cloudinary.com/dbcrofsyy/image/upload/v1583946027/005Volki_Fijacion_j2awas.webp'

    ],
    reservations: [],
    direction: 'Camí del Parc Central, AD500 Andorra la Vella, Andorra',
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