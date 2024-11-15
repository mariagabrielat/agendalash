var DataTypes = require("sequelize").DataTypes;
var _agendamentos = require("./agendamentos");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var agendamentos = _agendamentos(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  agendamentos.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(agendamentos, { as: "agendamentos", foreignKey: "id_usuario"});

  return {
    agendamentos,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
