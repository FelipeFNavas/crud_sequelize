"use strict";
module.exports = (sequelize, DataTypes) => {
  const Turmas = sequelize.define(
    "Turmas",
    {
      data_inicio: DataTypes.DATEONLY,
    },
    { paranoid: true }
  );
  Turmas.associate = function (models) {
    Turmas.hasMany(models.Matriculas, {
      forekey: "turma_id",
    });
    Turmas.belongsTo(models.Pessoas, {
      forekey: "docente_id",
    });
    Turmas.belongsTo(models.Niveis, {
      forekey: "nivel_id",
    });
  };
  return Turmas;
};
