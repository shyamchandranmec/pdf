"use strict";

let express = require("express");
let session = require('express-session');
let passport = require("passport");

module.exports = app => {

    app.use(express.static("public"));

    app.use((req, res, next) => {
        if (req.path.startsWith("/pdf-images")) {
            var imageName = req.path.replace("/pdf-images/", "");
            imageName = imageName.replace(".png", "");
            if (global[imageName]) {
                if (req.query.uid == global[imageName].uid) {
                    app.use(express.static("output"));
                } else {
                    return res.status(404).send("File not found")

                }
            } else {
                return res.status(404).send("File not found")

            }
        }
        next();
    })
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};
