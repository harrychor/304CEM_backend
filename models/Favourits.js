const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const FavouritesSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true
    },
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
    imdbID: {
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

FavouritesSchema.plugin(timestamp);

const Favourites = mongoose.model('Favourites', FavouritesSchema);
module.exports = Favourites;
