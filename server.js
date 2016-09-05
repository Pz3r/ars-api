var express = require('express');
var app = express();

var argv = require('optimist').argv;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(8080, argv.fe_ip, function() {
  console.log('Server started on port', 8080);
});