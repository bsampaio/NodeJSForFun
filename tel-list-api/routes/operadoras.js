var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var app = express();

//Conectando ao mongodb

var Operadora = new Schema({
	nome:String,
	codigo:String,
	preco:Number
});

//Busca o modelo (db.modelo) dentro do documento estabelecido em app.js
OperadoraModel = mongoose.model('operadora',Operadora);

router.get('/', function(req, res){
	/*
	O objeto do tipo query contém os parâmetros
	passados no momento da requisição. Ex: ?nome="Breno"
	if(req.query !== null){
		console.log(req.query.nome);
	}
	*/
	/*
	O objeto req.params contém os parâmetros passados
	na url como o formato
	http://url/:param1/:param2/.../:paramN
	
	res.send(200,{
		'id': req.params.id
	});
	*/
	OperadoraModel.find(function(err, operadoras){
		res.send(operadoras);
	});
});

module.exports = router;
