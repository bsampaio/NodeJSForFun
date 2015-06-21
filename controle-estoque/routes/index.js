var express = require('express');
var router = express.route();

module.exports = function(req, res){
	router('/')
		.get(function (req, res){
			res.send(200);
		});
};