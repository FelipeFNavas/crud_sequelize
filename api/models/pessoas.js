"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define(
    "Pessoas",
    {
      nome: {
        type: DataTypes.STRING,
        // validate: {
        //   funcaoValidadora: function (dado) {
        //     if (dado.lenght < 3)
        //       throw new Error("Nome deve ter mais de 3 caracteres");
        //   },
        // },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: { args: true, msg: "Email inválido" } },
      },
      role: DataTypes.STRING,
    },
    {
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scopes: {
        all: { where: {} },
      },
    }
  );
  Pessoas.associate = function (models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: "docente_id",
    });
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: "estudante_id",
      scope: { status: "confirmado" },
      as: "aulasMatriculadas",
    });
  };
  return Pessoas;
};
