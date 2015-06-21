var express = require('express');
var route = express.Router();

route('/nexter')
	.get(function(req, res){
		res.send(200);
	});

module.exports = route;