const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/user.model");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//Endpoints
authRoutes.post("/signup", (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.status(400).json("auth/signup", { message: "Indicate username and password" });
    return;
  }


  User.findOne({ username }, "username", (err, foundUser) => {
    if (err) {
      res.status(500).json("auth/signup", { message: "The username already exists" });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Saving user to database went wrong.' });
        return;
      }

      // Automatically log in user after sign up
      req.login(newUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(req.user);
      })
    })

  })
})



authRoutes.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});



authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport

  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.post('/update', (req, res, next) => {

  console.log('req.useer---->', req.user)



});



module.exports = authRoutes;
