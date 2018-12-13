const passport = require('passport')
const mongoose = require('mongoose')

const User = require('../models/User')

const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user || !user.verifyPassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  });
}));

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
