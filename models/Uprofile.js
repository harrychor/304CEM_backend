const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserProfileSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },


});

UserProfileSchema.plugin(timestamp);

const Uerprofile = mongoose.model('Uerprofile', UserProfileSchema);
module.exports = Uerprofile;
