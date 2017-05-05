
//Função 'construtora'
function ClientesDAO(connection) {
    this._connection = connection;

}
//USa prototype para atribuir funções/atributos ao objeto
ClientesDAO.prototype.lista = function(callback) {
    console.log('entrou em ClientesDAO.prototype.lista');
    this._connection.query('select * from TBL_CLIENTE', callback);
}

ClientesDAO.prototype.procura = function(login, pswd, callback) {
    this._connection.query('select * from TBL_CLIENTE WHERE LOGIN = ? AND SENHA = ?', [login, pswd], callback);
}

ClientesDAO.prototype.cadastra = function(json, callback) {
  // this._connection.query('insert into ')
  console.log('insert na tabela cliente');
}

module.exports = ClientesDAO;
