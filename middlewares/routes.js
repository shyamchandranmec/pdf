"use strict";

module.exports = app => {
    app.use("/", app.routes.index);
};