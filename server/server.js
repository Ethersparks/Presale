var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");

// Create server
var server = express();
server.use(bodyParser.json());

// Middleware
server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

server.post('/user', function(req, res, next) {
  var user = req.body;
  
  console.log(user)
  res.send({
    success: true,
    message: "Successfully added user", 
    user: user
  });
  console.log(user)
  next();
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


