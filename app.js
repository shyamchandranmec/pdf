"use strict";
let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();

consign()
    .include("./helpers")
    .then("./middlewares/basicSettings.js")
    .then("./middlewares/staticResources.js")
    .then("./auth/authentication.js")
    .then("./auth/sessionHandler.js")
    .then("./controllers/")
    .then("./routes")
    .then("./middlewares/routes.js")
    .then("./middlewares/errorHandler.js")
    .then("./middlewares/server.js")
    .into(app);




module.exports = app;