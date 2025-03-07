const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Workshop', 'Conference', 'Seminar', 'Meetup', 'Other']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function(v) {
                try {
                    new URL(v);
                    return true;
                } catch(error) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    status: {
        type: String,
        enum: ['upcoming', 'ended'],
        default: 'upcoming'
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});

// Add a pre-save hook to update status based on date
eventSchema.pre('save', function(next) {
    const currentDate = new Date();
    const eventDate = new Date(this.date);
    this.status = eventDate > currentDate ? 'upcoming' : 'ended';
    next();
});

// Add a method to check if event is upcoming
eventSchema.methods.isUpcoming = function() {
    return new Date(this.date) > new Date();
};

// Add an index for better query performance
eventSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model('Event', eventSchema);
