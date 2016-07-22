module.exports = app => {
    function getSession (req) {
        return req.session;
    }

    function getSessionUserDetails (req) {
        return req.user;
    }

    function getPassportSession (req) {
        return req.session.passport;
    }

    return {
        getSession: getSession,
        getSessionUserDetails: getSessionUserDetails,
        getPassportSession: getPassportSession
        
    }
}


