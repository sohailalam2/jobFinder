var mongoose = require("mongoose");
var Promise = require("bluebird");
var Job = mongoose.model('Job');

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

var connectDB = Promise.promisify(mongoose.connect, mongoose);
var createJob = Promise.promisify(Job.create, Job);

function findJob (query) {
    return Promise.cast(Job.find(query).exec());
}

function seedJobs() {
    return findJob({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
}

function resetJobs(callback) {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

module.exports = {
    connectDB: connectDB,
    seedJobs: seedJobs,
    findJob: findJob,
    resetJobs: resetJobs
};