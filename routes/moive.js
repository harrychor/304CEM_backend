const Moive = require('../models/Moive');
const config = require('../config');
const errors = require('restify-errors');

// Get Moives
module.exports = server =>{
server.get('/moive', async (req, res, next) => {
    try{
        const moive = await Moive.find({});
        res.send(moive);
        next();
    } catch(err){
        return next(new errors.InvalidContentError(err));
    }
});
// Add moive
server.post('/moive', async (req, res, next) => {
	//Check for JSON
	if (!req.is('application/json')){
		return next(new errors.InvalidContentError("Expects 'application/json'"));
	}

	const {title , description, author, artist} = req.body;
	const customer = new Customer({
		title,
		description,
		author,
		artist
	});
	try {
		const newMoive = await customer.save();
		res.send(201);
		next();
	}catch(err){
		return next(new errors.InternalError(err.message));
	}
});

//Update moive
server.put('/moive/:id',async (req, res, next) => {
	//Check for JSON
	if (!req.is('application/json')){
		return next(new errors.InvalidContentError("Expects 'application/json'"));
	}
	try {
		const newMoive = await Moive.findOneAndUpdate({_id: req.params.id}, req.body);
		res.send(200);
		next();
	}catch(err){
		return next(new errors.ResourceNotFoundError(`There is no moive with the id of ${req.params.id}`));
	}
});

//Delete moive
server.del('/moive/:id', async (req, res, next) =>{
	try{
		const moive = await Moive.findOneAndRemove({_id: req.params.id });
		res.send(204);
		next();
	}catch(err){
		return next(new errors.ResourceNotFoundError(`There is no moive with the id of ${req.params.id}`));
	}
});


};

/*
// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}


// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}

*/

