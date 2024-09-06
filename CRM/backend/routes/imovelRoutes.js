const express = require("express");
const router = express.Router();
const imovelController = require("../controllers/imovelController");
const checkAdmin = require("../middleware/checkAdmin"); // Middleware para verificar se é admin

// Rota para listar todos os imóveis
router.get("/", imovelController.getAllImoveis);

// Rota para criar um novo imóvel
router.post("/", imovelController.createImovel);

// Rota para buscar um imóvel específico por ID
router.get("/:id", imovelController.getImovelById);

// Rota para atualizar um imóvel existente
router.put("/:id", imovelController.updateImovel);

// Rota para deletar um imóvel
router.delete("/:id", imovelController.deleteImovel);

// Rota para o admin aprovar um imóvel
router.put("/:id/aprovar", checkAdmin, imovelController.aprovarImovel);

module.exports = router;
