var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
    Job.find({}).exec(function(error, collection) {
        if (collection.length === 0) {
            Job.create({ title: 'Sales Person', description: 'you will fight dragon' });
            Job.create({ title: 'Software Programmer', description: 'you will be building time machine' });
            Job.create({ title: 'Accountant', description: 'you will not be counting only money' });
        }
    });
}