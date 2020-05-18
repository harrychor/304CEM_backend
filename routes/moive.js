const request = require('request');
const config = require('../config');
const errors = require('restify-errors');

module.exports = server => {



server.get('/moive/results', function(req, res){
    const query = req.query.q;
    const url = 'https://www.omdbapi.com/?s=' + query + '&apikey=a5e7de51';

    request.get(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const moives = []
            const data = JSON.parse(body);
            for (let i = 0; i < data.length; i++) {
                const moive = {
                    Title: data[i].Title,
                    Year: data[i].volumeInfo.Year,
                    imdbID: data[i].volumeInfo.imdbID,
                    Type: data[i].volumeInfo.Type,
                    Poster: data[i].volumeInfo.Poster
                }
                moives.push(moive);
            }
            //res.send(moives);
            //res.send(query);
            res.send(data);

        }
    });
});
}