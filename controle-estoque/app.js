//Vendor Imports
var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var methodOverride = require('method-override');

//Local Imports

//App init
var app = express();

app.set('port',3000);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride());

app.set('view engine','ejs');
app.set('views', './app/views');

load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes')
	.into(app);

app.listen(app.get('port'),function(){
	console.log('Escutando em http://localhost:'+app.get('port'));
});