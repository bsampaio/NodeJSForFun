var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var app = express();

var Contato = new Schema({
	nome:String,
	telefone:String,
	operadora:{
		nome:String,
		codigo:String,
		preco:Number
	},
	data: {type:Date, default: Date.now }
});

ContatoModel = mongoose.model('contatos',Contato);

router.post('/', function(req, res){
	if (!req.body) return res.sendStatus(400);
	
    contato = new ContatoModel({
    	nome: req.body.nome,
    	telefone: req.body.telefone,
    	operadora:req.body.operadora,
    });

    contato.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
    });

	res.sendStatus(200);
});

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
	ContatoModel.find(function(err, contatos){
		res.send(contatos);
	});
});

module.exports = router;
