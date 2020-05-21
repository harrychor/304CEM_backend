const errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const Uerprofile = require('../models/Uprofile');
const config = require('../config');
const rjwt = require('restify-jwt-community');


module.exports = server =>{
//Get userprofile
server.get('/userprofile', async (req, res, next) => {
    try{
        const userprofile = await Uerprofile.find({});
        res.send(userprofile);
        next();
    } catch(err){
        return next(new errors.InvalidContentError(err));
    }
});

    //Get Single userprofile
    server.get('/userprofile/:id', async (req, res, next) => {
        try{
            const userprofile = await Uerprofile.findById(req.params.id);
            res.send(userprofile);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Add userprofile
    server.post('/userprofile'/*, rjwt({ secret: config.JWT_SECRET})*/, async (req, res, next) => {
        //Check for JSON
        if (!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const {username , email} = req.body;
        const userprofile = new Uerprofile({
            username,
            email,
        });

        try {
            const newCustomer = await userprofile.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });
    //Update userprofile
    server.put('/userprofile/:id', rjwt({ secret: config.JWT_SECRET}),async (req, res, next) => {
        //Check for JSON
        if (!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const newCustomer = await Uerprofile.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Delete userprofile
    server.del('/userprofile/:id', async (req, res, next) =>{
        try{
            const customer = await Uerprofile.findOneAndRemove({_id: req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });


};