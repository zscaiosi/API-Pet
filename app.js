//Carrega a função de config do express
var config = require('./config/express');
//Invoca a função de config do express criando minha var app que será utilizada para os requests
var app = config();

app.listen(5000, function(){
  console.log('Servidor rodando!');
});
