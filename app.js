//Carrega a função de config do express
var config = require('./config/express');
//Invoca a função de config do express criando minha var app que será utilizada para os requests
var app = config();
//Carrega a função getProdutosRequest
// var getCliente = require('./routes/getCliente');
//Invoca a fução GET passando app e um parametro de busca
// getCliente(app, 12345);

app.listen(3000, function(){
  console.log('Servidor rodando!');
});
