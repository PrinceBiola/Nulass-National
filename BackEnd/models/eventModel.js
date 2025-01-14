const moogose = require('mongoose');

const eventSchema = new moogose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdAt: {    
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
});

module.exports = moogose.model('Event', eventSchema);