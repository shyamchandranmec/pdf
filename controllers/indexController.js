
"use strict";

module.exports = (app) => {
    let logger = app.helpers.logger;
    let sessionHandler = app.auth.sessionHandler;

    function fetchHomePageData (req, res, next) {
        if((sessionHandler.getSessionUserDetails(req) == undefined)||(sessionHandler.getSessionUserDetails(req) == null)) {
            res.render('login',{title:'Login'})
        } else {
            res.render('index', { title: 'Welcome' });
        }
    }

    return {
        fetchHomePageData: fetchHomePageData
    }
}