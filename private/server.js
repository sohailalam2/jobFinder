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

var decodedUsername = aes.decrypt("a46b9f0d8f3be9d1717c65dca2620c4d", PRIVATE_PASSWORD);
var decodedPassword = aes.decrypt("f02dd8e8f8766d440599c086c264ac3d", PRIVATE_PASSWORD);

jobsData.connectDB('mongodb://' + decodedUsername + ':' + decodedPassword + '@dbh86.mongolab.com:27867/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        jobsData.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);
