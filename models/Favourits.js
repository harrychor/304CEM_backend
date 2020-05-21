const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
        trim: true
    },
    Year: {
        type: String,
        required: true,
        trim: true
    },
    imdb: {
        type: Number,
        required: true,
        trim: true
    },
    Poster: {
        type: String,
        required: true,
        trim: true
    }

});

CustomerSchema.plugin(timestamp);

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
