const errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const Favourites = require('../models/Favourits');
const config = require('../config');
const rjwt = require('restify-jwt-community');


module.exports = server =>{
    //Get all favourites
    server.get('/favourites', async (req, res, next) => {
        try{
            const favourites = await Favourites.find({});
            res.send(favourites);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get favourites
    server.get('/favourites/:email', async (req, res, next) => {
        try{
            const favourites = await Favourites.find({email: req.params.email});
            res.send(favourites);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Add favourites
    server.post('/favourites'/*, rjwt({ secret: config.JWT_SECRET})*/, async (req, res, next) => {
        //Check for JSON
        if (!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const {email,Title , Year, imdbID, Poster} = req.body;
        const favourites = new Favourites({
            email,
            Title,
            Year,
            imdbID,
            Poster
        });

        try {
            const newCustomer = await favourites.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });
    //Update favourites
    server.put('/favourites/:id'/*, rjwt({ secret: config.JWT_SECRET})*/,async (req, res, next) => {
        //Check for JSON
        if (!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const newCustomer = await Favourites.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Delete favourites
    server.del('/favourites/:id', async (req, res, next) =>{
        try{
            const customer = await Favourites.findOneAndRemove({_id: req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });


};