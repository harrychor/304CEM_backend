  
const mongoose = require('mongoose');

// Book Schema
const BookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	}
});


const book = mongoose.model('Book', BookSchema);
module.exports = book;