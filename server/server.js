var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var _ = require('lodash');

var database = require('./database');

// Create server
var server = express();
server.use(bodyParser.json());


var getWPPost = function(req, res){
  var headers, options;

  // Set the headers
  headers = {
      'Content-Type':'application/x-www-form-urlencoded'
  }

  // Configure the request
  options = {
      url: 'http://ethersparks.io/wp-json/wp/v2/page/',
      method: 'GET',
      headers: headers
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send({
             success: true,
             message: "Successfully fetched a list of post", 
             posts: JSON.parse(body)
          });
      } else {
           console.log(error);
      }
   });
 };


// Middleware
server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Routes
server.get('/page', function(req, res, next) {
  getWPPost(req, res);
});

server.post('/page', function(req, res, next) {
  var todo = req.body;
  database.add(todo, function(todos) {
    res.send(todos);
    next();
  });
});

server.delete('/page/:id', function(req, res, next) {
  var id = req.params.id;
  
  database.del(id, function(todos) {
    res.send(todos);
    next();
  });
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


