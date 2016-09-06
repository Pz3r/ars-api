var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var argv = require('optimist').argv;
var google = require('googleapis');
var prediction = google.prediction('v1.6');

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/predecir', function(req, res) {

  // TODO parse posted values and create input strings for prediction

  google.auth.getApplicationDefault(function(err, authClient) {
    if(err) {
      console.log('Authentication failed because of ', err);
      return;
    }

    if(authClient.createScopedRequired && authClient.createScopedRequired()) {
      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      authClient = authClient.createScoped(scopes);
    }

    var request = {
      project: 'ars-api',
      id: 'ars-1-model-01022016',
      resource: {

      },
      auth: authClient
    };

    prediction.trainedmodels.predict(request, function(err, result) {
      if(err) {
        res.render('prediction', {result: err});
      } else {
        res.render('prediction', {result: result});
      }
    });

  });
});

app.listen(8080, argv.fe_ip, function() {
  console.log('Server started on port', 8080);
});