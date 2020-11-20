const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: {id}
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    LocalStrategy();
};