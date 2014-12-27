var express = require("express");
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data");

var app = express();

require('./jobs-service')(jobsData, app);

app.set("views", __dirname);
app.set("view engine", "jade");

app.use(express.static(__dirname + '/public'));

app.get("*", function(req, res) {
    res.render("index");
});

// jobsData.connectDB('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://dev:dev@dbh86.mongolab.com:27867/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        jobsData.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);
