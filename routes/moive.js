const request = require('request');
const config = require('../config');
const errors = require('restify-errors');

module.exports = server => {


server.get('/results', function(req, res){
    const query = req.query.search;
    const url = 'https://www.omdbapi.com/?s=' + query + '&apikey=a5e7de51';

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            //console.log(data)
            res.send(data);
        }
    });
});
}