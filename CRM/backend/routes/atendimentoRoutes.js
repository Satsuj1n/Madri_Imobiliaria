const express = require("express");
const router = express.Router();
const atendimentoController = require("../controllers/atendimentoController");

// Rotas de Atendimento
router.get("/", atendimentoController.getAllAtendimentos);
router.post("/", atendimentoController.createAtendimento);
router.get("/:id", atendimentoController.getAtendimentoById);
router.put("/:id", atendimentoController.updateAtendimento);
router.delete("/:id", atendimentoController.deleteAtendimento);

module.exports = router;
