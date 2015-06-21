module.exports = function() {
  var controller = {};
  controller.index = function(req, res) {
    res.render('index', {nome: 'Express'});
  };

  var foo = function(bar){
  	console.log('foo'+bar);
  };

  var bar = function(){
  	foo('bar');
  };

  controller.next = function(req, res){
  	bar();
  	res.sendStatus(200);
  };

  return controller;
};
