
module.exports = (sequelize, DataTypes) => {
  const Agendamentos = sequelize.define('Agendamentos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dataAg: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    servico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusAg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios', // Nome da tabela referenciada
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'agendamentos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" }
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" }
        ]
      }
    ]
  });

  return Agendamentos;
};
