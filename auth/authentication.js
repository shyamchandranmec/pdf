"use strict";

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
    let logger = app.helpers.logger;
    passport.use(new LocalStrategy({usernameField: "email"}, function (email, password, done) {
        var email = email;
        let user = {
            email: "s@s.com"
        };
        if (email == "s@s.com" && password == "s") {
            done(null, user)
        } else {
            done(null, false)
        }
    }));


    passport.serializeUser(function (user, done) {
        logger.info("Serializing");
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        logger.info("De Serializing");
        done(null, user)
    });
}



