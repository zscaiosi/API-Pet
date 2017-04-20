module.exports = function(app){

  //retorna a instância configurada
  app.get('/clientes', function(req,res){
  // Usar query, pois o GET é feito em quey string
     var clienteProcurado = req.query;
  //Carrega a função connectionFactory em uma variável
     var connection = app.infra.connectionFactory();
  //Instancia o controller de conexão em um contexto próprio de memória (usando new)
     var clientesDAO = new app.infra.ProdutosDAO(connection);
  //Invoca a função lista do objeto controller produtosDAO
        produtosDAO.lista(function(err, rows) {
            res.status(200).send({lista: rows});
        });

        connection.end();

     //
    //  if( Object.getOwnPropertyNames(clienteProcurado).length > 1 ){
    //    //Executa a função para cada elemento do array
    //    listaClientes.map((cliente, index) => {
     //
    //      if( cliente.login === clienteProcurado.login && cliente.senha === clienteProcurado.password ){
    //        res.send("Olá, "+cliente.nome+"!"+" Seu login é: "+cliente.login);
    //        return;
    //      }else{
    //        return;
    //      }
     //
    //    });
    //  }else{
    //    res.status(404).send({erro: "Você não passou parâmetros suficientes!", esperado: "?login='seulogin'&password='suasenha'"});
    //  }
   });
}
