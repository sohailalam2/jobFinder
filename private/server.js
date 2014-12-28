/**
 * ------------------------------------------
 *
 * This is the entry point of the application
 *
 * ------------------------------------------
 *
 */

var express = require("express"),
    jobModel = require("./models/Job"),
    jobsData = require("./jobs-data"),
    aes = require('aes-helper'),
    app = express(),
    mongoose = require("mongoose");

// Initiaize the jobs api service
require('./jobs-service')(jobsData, app);

// A hack to set the views and static directory
var publicDir = '',
    currentDirSplit = __dirname.split('\/');
for (var count = 0; count < currentDirSplit.length - 1; count++) {
    publicDir += '/' + currentDirSplit[count];
}
publicDir += '/public'

app.set("views", publicDir);
app.set("view engine", "jade");

app.use(express.static(publicDir));

app.get("*", function(req, res) {
    res.render("index");
});


// The PRIVATE_PASSWORD must be passed as an environment variable,
// and will be used to decrypt the database credentials
var PRIVATE_PASSWORD = process.env.PRIVATE_PASSWORD;
if (!PRIVATE_PASSWORD) {
    console.error('Please set the environment variable PRIVATE_PASSWORD');
    process.exit(-1);
}

// The remote database credentials
var decodedUsername = aes.decrypt("a46b9f0d8f3be9d1717c65dca2620c4d", PRIVATE_PASSWORD);
var decodedPassword = aes.decrypt("f02dd8e8f8766d440599c086c264ac3d", PRIVATE_PASSWORD);

// Connect to the remote database
jobsData.connectDB('mongodb://' + decodedUsername + ':' + decodedPassword +
        '@dbh86.mongolab.com:27867/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        // Print MongoDB Version
        var admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.buildInfo(function(err, info) {
            console.log('Database Version: ' + info.version);
        });

        jobsData.seedJobs();
    });

// Start the server
var ip = process.env.IP,
    port = process.env.PORT;
app.listen(port, ip);
console.log('JobFinder is up and running @ ' + ip + ":" + port);