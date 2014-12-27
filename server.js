var express = require("express");
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data");

var app = express();

app.set("views", __dirname);
app.set("view engine", "jade");

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJob({})
        .then(function(collection) {
            res.send(collection);
        });
})

app.get("*", function(req, res) {
    res.render("index");
});

// jobsData.connectDB('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://dev:dev@dbh86.mongolab.com:27867/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        jobModel.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);
