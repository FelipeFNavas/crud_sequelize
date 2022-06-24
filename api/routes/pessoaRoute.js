const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.getAllActivePeople);
router.get("/pessoas/todas", PessoaController.getAllPeople);
router.get("/pessoas/:id", PessoaController.getOnePerson);
router.get("/pessoas/:id/matriculas", PessoaController.getRegistration);
router.get(
  "/pessoas/matriculas/:id/confirmados",
  PessoaController.getRegistrationByTeam
);
router.get("/pessoas/matriculas/fullTeam", PessoaController.getFullTeam);
router.post("/pessoas", PessoaController.createPerson);
router.post("/pessoas/:id/cancela", PessoaController.cancelPessoa);
router.put("/pessoas/:id", PessoaController.updatePerson);
router.delete("/pessoas/:id", PessoaController.deletePerson);
router.post("/pessoas/:id/restaura", PessoaController.restorePeople);

module.exports = router;
