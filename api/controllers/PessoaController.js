const database = require("../models/index.js");
const Sequelize = require("sequelize");

class PessoasController {
  static async getAllActivePeople(req, res) {
    try {
      const activePeople = await database.Pessoas.findAll();

      return res.status(200).json(activePeople);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getAllPeople(req, res) {
    try {
      const allPeople = await database.Pessoas.scope("all").findAll();

      return res.status(200).json(allPeople);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getOnePerson(req, res) {
    try {
      const person = await database.Pessoas.findByPk(req.params.id);

      return res.status(200).json(person);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async restorePeople(req, res) {
    try {
      const { id } = req.params;

      await database.Pessoas.restore({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ messagem: `Pessoa com o id ${id} restaurada com sucesso` });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async createPerson(req, res) {
    try {
      const person = await database.Pessoas.create(req.body);

      return res.status(201).json(person);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async updatePerson(req, res) {
    try {
      const person = await database.Pessoas.findByPk(req.params.id);
      const updatedPerson = await person.update(req.body);

      return res.status(200).json(updatedPerson);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async deletePerson(req, res) {
    try {
      const person = await database.Pessoas.findByPk(req.params.id);
      await person.destroy();
      return res.status(204).json({
        message: `Pessoa com o id ${req.params.id} deletada com sucesso`,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getRegistration(req, res) {
    const { id: estudanteId } = req.params;
    try {
      const person = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const registration = await person.getAulasMatriculadas();
      return res.status(200).json(registration);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getRegistrationByTeam(req, res) {
    const { id } = req.params;
    try {
      const allRegistration = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(id),
          status: "confirmado",
        },
        limit: 20,
        order: [["estudante_id", "ASC"]],
      });
      return res.status(200).json(allRegistration);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getFullTeam(req, res) {
    const fullTeam = 2;
    try {
      const allTeams = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${fullTeam}`),
      });

      return res.status(200).json(allTeams.count);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  static async cancelPessoa(req, res) {
    const { id } = req.params;
    try {
      database.sequelize.transaction(async (transacao) => {
        await database.Pessoas.update(
          { ativo: false },
          { where: { id: Number(id) } },
          { transaction: transacao }
        );

        await database.Matriculas.update(
          { status: "cancelado" },
          { where: { estudante_id: Number(id) } },
          { transaction: transacao }
        );
      });

      return res
        .status(200)
        .json({ message: `Matriculas do estudante ${id} canceladas` });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}

module.exports = PessoasController;
