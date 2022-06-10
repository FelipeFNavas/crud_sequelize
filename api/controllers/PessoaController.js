// import database from "../models/index.js";
const database = require("../models/index.js");

class PessoasController {
  static async getAllPeople(req, res) {
    try {
      const allPeople = await database.Pessoas.findAll();

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
}

module.exports = PessoasController;
