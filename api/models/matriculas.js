"use strict";
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define(
    "Matriculas",
    {
      status: DataTypes.STRING,
    },
    {}
  );
  Matriculas.associate = function (models) {
    Matriculas.belongsTo(models.Pessoas, {
      forekey: "estudante_id",
    });
    Matriculas.belongsTo(models.Turmas, {
      forekey: "turma_id",
    });
  };
  return Matriculas;
};
