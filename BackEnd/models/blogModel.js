const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    postTime: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true
    },
    author: {

        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    comments: [{
        user: String,
        comment: String,
        createdAt: { type: Date, default: Date.now },
    }],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
