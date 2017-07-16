function PetsDAO(connection) {
    this._connection = connection;
}
PetsDAO.prototype.procura = function (callback) {
    //Toda query chama um callback, passando erro e resultados
    this._connection.query('select * from TBL_PET', callback);
};
module.exports = PetsDAO;
