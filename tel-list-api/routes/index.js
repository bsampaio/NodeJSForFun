var express = require('express');
var router = express.Router();

router.get('/users/:id', function(req, res){
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
	res.render('index', {title: 'backend-listtel'});
});

module.exports = router;
