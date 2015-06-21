//Vendor imports
var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var methodOverride = require('method-override');

//Local imports
var home = require('../app/routes/home');

module.exports = function(){
  var app = express();

  app.set('port',3000);

  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('view engine','ejs');
  app.set('views','./app/views');

  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
