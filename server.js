var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var argv = require('optimist').argv;

var url = require('url');
var querystring = require('querystring');

var google = require('googleapis');
var prediction = google.prediction('v1.6');

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/predecir', function(req, res) {
  var q = url.parse(req.url).query;

  var estadoAnimo = multiplyString(q.animado, 'animado') +
  multiplyString(q.feliz, 'feliz') +
  multiplyString(q.triste, 'triste') +
  multiplyString(q.cansado, 'cansado') +
  multiplyString(q.afectuoso, 'afectuoso') +
  multiplyString(q.contento, 'contento') +
  multiplyString(q.pesimista, 'pesimista') +
  multiplyString(q.agitado, 'agitado') +
  multiplyString(q.adormecido, 'adormecido') +
  multiplyString(q.gruñon, 'gruñon')
  multiplyString(q.vivaracho, 'vivaracho') +
  multiplyString(q.nervioso, 'nervioso') +
  multiplyString(q.tranquilo, 'tranquilo') +
  multiplyString(q.cariñoso, 'cariñoso') +
  multiplyString(q.harto, 'harto') +
  multiplyString(q.energetico, 'energetico');

  var olores = multiplyString(q.limon, 'limon') +
  multiplyString(q.lemongrass, 'lemongrass') +
  multiplyString(q.pachuli, 'pachuli') +
  multiplyString(q.romero, 'romero') +
  multiplyString(q.oregano, 'oregano') +
  multiplyString(q.violeta, 'violeta') +
  multiplyString(q.almizcle, 'almizcle') +
  multiplyString(q.gengibre, 'gengibre') +
  multiplyString(q.pimienta, 'pimienta') +
  multiplyString(q.ambar_gris, 'ambar_gris');

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
              estadoAnimo.trim(),
              olores.trim()
          ]
        }
      },
      auth: authClient
    };

    prediction.trainedmodels.predict(request, function(err, result) {
      if(err) {
        //res.render('prediction', {result: err});
        res.send(err);
      } else {
        //res.render('prediction', {result: result});
        res.json(result);
      }
    });

  });
});

app.post('/predecir', function(req, res) {
  var estadoAnimo = multiplyString(req.body.animado, 'animado') +
  multiplyString(req.body.feliz, 'feliz') +
  multiplyString(req.body.triste, 'triste') +
  multiplyString(req.body.cansado, 'cansado') +
  multiplyString(req.body.afectuoso, 'afectuoso') +
  multiplyString(req.body.contento, 'contento') +
  multiplyString(req.body.pesimista, 'pesimista') +
  multiplyString(req.body.agitado, 'agitado') +
  multiplyString(req.body.adormecido, 'adormecido') +
  multiplyString(req.body.gruñon, 'gruñon')
  multiplyString(req.body.vivaracho, 'vivaracho') +
  multiplyString(req.body.nervioso, 'nervioso') +
  multiplyString(req.body.tranquilo, 'tranquilo') +
  multiplyString(req.body.cariñoso, 'cariñoso') +
  multiplyString(req.body.harto, 'harto') +
  multiplyString(req.body.energetico, 'energetico');

  var olores = multiplyString(req.body.limon, 'limon') +
  multiplyString(req.body.lemongrass, 'lemongrass') +
  multiplyString(req.body.pachuli, 'pachuli') +
  multiplyString(req.body.romero, 'romero') +
  multiplyString(req.body.oregano, 'oregano') +
  multiplyString(req.body.violeta, 'violeta') +
  multiplyString(req.body.almizcle, 'almizcle') +
  multiplyString(req.body.gengibre, 'gengibre') +
  multiplyString(req.body.pimienta, 'pimienta') +
  multiplyString(req.body.ambar_gris, 'ambar_gris');

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
              estadoAnimo.trim(),
              olores.trim()
          ]
        }
      },
      auth: authClient
    };

    prediction.trainedmodels.predict(request, function(err, result) {
      if(err) {
        //res.render('prediction', {result: err});
        res.send(err);
      } else {
        //res.render('prediction', {result: result});
        res.json(result);
      }
    });

  });
});

app.listen(8080, argv.fe_ip, function() {
  console.log('Server started on port', 8080);
});

function multiplyString(times, str) {
  if(times && Number.isInteger(times)) {
    return (new Array(parseInt(times) + 1)).join(str + ' ');
  } else {
    return '';
  }
}