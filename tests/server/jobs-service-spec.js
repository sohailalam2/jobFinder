var express = require("express");
var app = express();
var expect = require("chai").expect;
var supertest = require("supertest");
var Promise = require("bluebird");

var dataSavedJob;
var db = {

    findJobs: function () {
        return new Promise(function (resolve, reject) {
            resolve(['hi']);
        })
    },

    saveJob: function(job) {
        dataSavedJob = job;
    }
};
var jobsService = require("../../jobs-service")(db, app);

describe('get jobs', function() {

    it('should return a json list of jobs', function(done){
        supertest(app).get('/api/jobs')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            expect(res.body).to.be.a('Array');
            done();
        })
    });

});

describe('save job', function() {
    it('should validate that title is greater than 4 characters');
    it('should validate that title is less than 40 characters');
    it('should validate that description is greater than 4 characters');
    it('should validate that description is greater than 250 characters');

    var newJob = {
        title: 'Sales Person',
        description: 'you will fight dragon'
    };

    it('should pass the job to the database save', function(done) {
        supertest(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });
    it('should return a status of 200 to the frontend if the databae is saved');
    it('should return a job with an id');
    it('should return an error if the database failed');
})