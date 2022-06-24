const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.getAllActivePeople);
router.get("/pessoas/todas", PessoaController.getAllPeople);
router.get("/pessoas/:id", PessoaController.getOnePerson);
router.post("/pessoas", PessoaController.createPerson);
router.put("/pessoas/:id", PessoaController.updatePerson);
router.delete("/pessoas/:id", PessoaController.deletePerson);
router.post("/pessoas/:id/restaura", PessoaController.restorePeople);

module.exports = router;
