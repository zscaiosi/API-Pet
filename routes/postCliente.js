module.exports = function(app){
  var clientesArr = [];

  app.post("/clientes/cadastrar", function(req,res){
    //Atribui a cliente os parâmetros passados pelo body do request
    var clienteCadastrado = req.body;

    if( Object.getOwnPropertyNames(clienteCadastrado).length > 1 ){
      clientesArr.push(clienteCadastrado);
      res.status(200).send(clientesArr);
    }else{
      res.status(404).send({erro: "Você não passou parâmetros suficientes!", esperado: "?login='seulogin'&password='suasenha'"});
    }
  })
}
