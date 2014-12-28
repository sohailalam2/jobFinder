/**
 * 
 * These are some of the helper function to manipulate the 
 * Job database.
 * 
 */
 
var mongoose = require("mongoose");
var Promise = require("bluebird");
var Job = mongoose.model('Job');

// Some seed jobs for the database, so that we don't start empty
var jobs = [{
        title: 'Sales Person',
        description: 'you will fight dragon'
    }, {
        title: 'Software Programmer',
        description: 'you will be building time machine'
    }, {
        title: 'Accountant',
        description: 'you will not be counting only money'
    }

];

// Promisified Mongoose connect method
var connectDB = Promise.promisify(mongoose.connect, mongoose);
// Promisified Mongoose create method
var createJob = Promise.promisify(Job.create, Job);

/**
 * Find jobs with a given query
 */
function findJobs (query) {
    return Promise.cast(Job.find(query).exec());
}

/**
 * Helper function to seed the database with sample jobs
 */
function seedJobs() {
    return findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
}

/**
 * Helper function to delete the jobs database
 */
function resetJobs(callback) {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

module.exports = {
    connectDB: connectDB,
    seedJobs: seedJobs,
    findJobs: findJobs,
    resetJobs: resetJobs,
    saveJob: createJob
};