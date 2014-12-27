var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require("../../models/Job");
var jobsData = require("../../jobs-data");

describe('get jobs', function() {
    var jobs;

    before(function(done) {
        jobsData.connectDB('mongodb://localhost/jobfinder')
            .then(jobsData.resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    });

    after(function () {
        mongoose.connection.close();
    });

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

describe('db save job', function() {

    var job = {title: 'Cook', description: 'You will be responsible for feeding the code monkeys'};
    var jobs;

    function saveTestJob() {
        return jobsData.saveJob(job);
    }

    before(function(done) {
        jobsData.connectDB('mongodb://localhost/jobfinder')
            .then(jobsData.resetJobs)
            .then(function(){ return jobsData.saveJob(job); })
            .then(jobsData.findJobs)
            .then(function setJobs(collection) {
                jobs = collection;
                done();
            });
    });

    after(function () {
        mongoose.connection.close();
    });

    it('should have one job after saving one job', function (done) {
        expect(jobs).to.have.length(1);
        done();
    });
})