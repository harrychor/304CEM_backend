const request = require('request');
const config = require('../config');
const errors = require('restify-errors');


module.exports = server => {
    
server.get('/moive/:q',async function(req, res, next){
    const query =  req.params.q;
    const url = 'https://www.omdbapi.com/?s=' + query + '&apikey=a5e7de51';

    request.get(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const moives = []
            const data = JSON.parse(body).Search;
            
            for (let i = 0; i < data.length; i++) {
                const moive = {
                    Title: data[i].Title,
                    Year: data[i].Year,
                    imdbID: data[i].imdbID,
                    Type: data[i].Type,
                    Poster: data[i].Poster
                }
                moives.push(moive);
            }
            //res.send(moives);
            console.log(req.params.q);
            res.send(data);

        }
    });
    next();
});
}