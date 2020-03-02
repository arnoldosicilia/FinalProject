//Enviroment
require('dotenv').config();

//Database Connection
require('./configs/mongoose.config')

//Application Instance
const express = require('express');
const app = express();

// Middleware Setup
require('./configs/middleware.config')(app)

//Locals Configuration
require('./configs/locals.config')(app)

// Enable authentication using session + passport
require('./configs/session.config')(app)


//Base URLs
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/offer', require('./routes/offer.routes'));


module.exports = app;