var express = require("express");
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data");
var aes = require('aes-helper');

var app = express();

require('./jobs-service')(jobsData, app);

app.set("views", "../public");
app.set("view engine", "jade");

app.use(express.static('../public'));

app.get("*", function(req, res) {
    res.render("index");
});

var PRIVATE_PASSWORD = process.env.PRIVATE_PASSWORD;
if (!PRIVATE_PASSWORD) {
    console.error('Please set the environment variable PRIVATE_PASSWORD');
    process.exit(-1);
}

var decodedUsername = aes.decrypt("6b8e11384ff1a6ee8d370dd6644d7db5", PRIVATE_PASSWORD);
var decodedPassword = aes.decrypt("2b904803a06895640f7726a71bc1e234", PRIVATE_PASSWORD);

jobsData.connectDB('mongodb://' + decodedUsername + ':' + decodedPassword + '@dbh86.mongolab.com:27867/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        jobsData.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);
