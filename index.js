const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');
const server = restify.createServer();
const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost/', 'localhost:4200'],
  allowHeaders: ['Authorization'],
  credentials:true,
  allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
  exposeHeaders: ['Authorization']
})

server.use(restify.plugins.bodyParser());
//server.use(rjwt({ secret: config.JWT_SECRET}).unless({ path: ['/auth']}));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    );
  });

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/moive')(server);
    require('./routes/customers')(server);
    require('./routes/user')(server);
    console.log(`Server started on port ${config.PORT}`);
  });