const express = require("express");
const router = express.Router();
const condominioController = require("../controllers/condominioController");

// Definir as rotas de CRUD para Condomínios
router.get("/", condominioController.getAllCondominios);
router.post("/", condominioController.createCondominio);
router.get("/:id", condominioController.getCondominioById);
router.put("/:id", condominioController.updateCondominio);
router.delete("/:id", condominioController.deleteCondominio);

module.exports = router;
