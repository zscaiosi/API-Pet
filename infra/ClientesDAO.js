//Função 'construtora'
function ClientesDAO(connection) {
    this._connection = connection;
}
//USa prototype para atribuir funções/atributos ao objeto
ClientesDAO.prototype.lista = function(login, callback) {
    this._connection.query('select * from TBL_CLIENTES WHERE LOGIN = ?', [login], callback);
}

// ClientesDAO.prototype.buscaLogin = function(id, callback) {
//   this._connection.query('SELECT por login=email');
// }

module.exports = function(){
    return ClientesDAO;
};
