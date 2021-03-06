const mongoose = require('mongoose');
const session = require("express-session");

const MongoStore = require('connect-mongo')(session);

const passport = require('passport')

require('./passport.config')



module.exports = app => {

    app.use(session({
        secret: 'irongenerator',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}