var http = require('http');
var app = require('./config/express.js')();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express escutando na porta '+ app.get('port'));
  console.log('Servidor rodando em: '+'http://localhost:3000/');
});
