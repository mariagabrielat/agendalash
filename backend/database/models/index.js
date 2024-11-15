const { Sequelize, DataTypes } = require('sequelize');

// Crie a instância do Sequelize (ajuste os parâmetros conforme o seu banco de dados)
const sequelize = new Sequelize('mysql://root@localhost:3306/agendalash', {
  dialect: 'mysql', // ou outro banco, como 'postgres' ou 'sqlite'
  logging: false,  // Defina como true para debugar as queries SQL
});

const db = {};

// Importa todos os modelos
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa o modelo de usuário
db.Usuarios = require('./usuarios')(sequelize, DataTypes);
// Importa o modelo de agendamento
db.Agendamentos = require('./agendamentos')(sequelize, DataTypes);

// Defina relações entre os modelos (se houver)
db.Agendamentos.belongsTo(db.Usuarios, { foreignKey: 'id_usuario' });

module.exports = db;
