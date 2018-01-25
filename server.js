var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

massive (
  "postgres://sxwxwadolyigmr:2267a42c313d12f1b57ef22fac7d4bcb7278efba50db6d9d41b0d34bae0e5854@ec2-107-20-224-137.compute-1.amazonaws.com:5432/dbp019b4a1pvis?ssl=true"
).then(function(db){
  app.set('db', db);
});

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/injuries',function(req,res) {
  app.get('db').getAllInjuries().then(function(injuries){
    res.send(injuries);
  });
});

app.get('/causes',function(req,res) {
  app.get('db').getAllCauses().then(function(causes){
    res.send(causes);
  });
});

app.get('/injuries/bad', function(req,res) {
  var params = [
    req.query.lower,
    req.query.upper
  ]
  app.get('db').getBadInjuries(params).then(function(injuries) {
    res.send(injuries);
  });
});
// http://localhost:3000/injuries/bad?lower=5&upper=10


app.post('/injuries', function(req,res) {
  var params = [
    req.body.id,
    req.body.name,
    req.body.description,
    req.body.tth
  ]
  app.get('db').createInjury(params).then(function(resp) {
    res.send(resp);
  });
});

app.get('/injuries/')

app.get('/incidents', function(req, res) {
  // console.log(app.get('db'));
  console.log('GET sighting');
});

app.post('/incidents', function(req, res) {
  console.log('POST sighting');
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
