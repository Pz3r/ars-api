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
      var scopes = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction'];
      authClient = authClient.createScoped(scopes);
      console.log('Scopes added');
    }

    var request = {
      project: '855466288430',
      id: 'ars-1-model-01022016',
      resource: {
        input: {
          csvInstance: [
              'animado animado animado feliz feliz feliz triste cansado cansado cansado afectuoso afectuoso afectuoso afectuoso contento contento contento pesimista pesimista agitado agitado adormecido adormecido gruñon gruñon vivaracho vivaracho nervioso nervioso tranquilo tranquilo tranquilo tranquilo cariñoso cariñoso cariñoso harto energetico energetico energetico',
              'limon limon limon limon limon limon limon limon limon lemongrass lemongrass lemongrass lemongrass lemongrass lemongrass lemongrass lemongrass lemongrass pachuli pachuli pachuli romero romero romero romero romero romero romero romero oregano oregano oregano violeta violeta violeta violeta almizcle almizcle almizcle almizcle almizcle almizcle almizcle gengibre gengibre gengibre gengibre gengibre gengibre gengibre gengibre pimienta pimienta pimienta pimienta pimienta pimienta pimienta ambar_gris ambar_gris ambar_gris ambar_gris ambar_gris ambar_gris'
          ]
        }
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