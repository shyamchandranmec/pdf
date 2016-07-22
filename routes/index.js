"use strict";

let express = require('express');
let router = express.Router();
let passport = require("passport");
let uuid = require("uuid");
let fs = require("fs");

module.exports = (app) => {

    function verifyAuth (req, res, next) {
        if (!req.isAuthenticated()) {
            logger.info("Not authenitcateid")
            res.status(404);
            return res.render("login", {title: "Login"});
        }
        next();
    }

    let logger = app.helpers.logger;
    let indexController = app.controllers.indexController;
    let multer = require('multer');
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuid.v1() + ".pdf");
        }
    });
    let upload = multer({storage: storage});

    let exec = require('child_process').execSync;


    router.route("/").get((req, res, next) => {
        return indexController.fetchHomePageData(req, res, next)
    });

    router.route("/upload").post(verifyAuth,upload.single('pdf'), (req, res, next) => {
        let inputFile = __dirname + "/../uploads/" + req.file.filename;
        var fileName = req.file.filename.replace(".pdf", "");
        let outputFile = __dirname + "/../output/pdf-images/" + fileName + ".png";
        let cmd = `convert ${inputFile}  ${outputFile}`;
        exec(cmd, function (error, stdout, stderr) {
            if (!error) {
                console.log("Done")
            } else {
                logger.error(error);
            }

        });
        res.render("url", {title: "URL to PDF", url: "/files/" + fileName})
    });


    router.route("/files/:fileName").get(verifyAuth, (req, res, next) => {
        let fileName = req.params.fileName;
        let filesArray = [];
        let count = 0;
        let imageName = fileName;
        let filePath = "output/pdf-images/" + imageName + ".png";
        filesArray = getFilesArray(imageName, fileName, filePath, filesArray);

        imageName = fileName + "-" + count;
        filePath = "output/pdf-images/" + imageName + ".png";
        filesArray = getFilesArray(imageName, fileName, filePath, filesArray, count);
        res.render("show-file", {filesArray: filesArray, title: "File"});
    });

    function getFilesArray (imageName, fileName, filePath, filesArray, count) {
        try {
            while (fs.statSync(__dirname + "/../" + filePath)) {
                global[imageName] = {};
                global[imageName].uid = uuid.v1();
                filesArray.push("pdf-images/" + imageName + ".png?uid=" + global[imageName].uid);
                (function (iname) {
                    setTimeout(function () {
                        delete global[iname];
                    }, 5000)
                })(imageName);
                if (!isNaN(count)) {
                    count++;
                    imageName = fileName + "-" + count;
                    filePath = "output/pdf-images/" + imageName + ".png";
                } else {
                    break;
                }
            }
        } catch (err) {
            console.log(err);
            console.log(filesArray.length)
        }
        return filesArray
    }


    router.route("/login").get((req, res, next) => {
        res.render('login', {title: 'Login'})
    }).post(passport.authenticate('local',
        {
            successRedirect: "/",
            failureRedirect: "/login"
        }
    ));


    return router;

};

