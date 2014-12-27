var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require("../models/Job");
var jobsData = require("../jobs-data");

describe('get jobs', function() {
    this.timeout(15000);

    var jobs;

    before(function(done) {
        jobsData.connectDB('mongodb://dev:dev@dbh86.mongolab.com:27867/jobfinder')
            .then(jobsData.resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJob)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    })

    it('should never be empty, since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job with a title', function() {
        expect(jobs[0].title).to.not.be.empty;
    });

    it('should have a job with a description', function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});