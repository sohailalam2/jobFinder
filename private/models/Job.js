/**
 * This is the Job Model
 *
 * A Job can only have a title and a description.
 */

var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    createDate: {
        type: Date,
        expires: 60,
        default: Date.now
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

// Register the Job Schema with mongoose
mongoose.model('Job', jobSchema);