const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

// Definir as rotas de CRUD para Clientes
router.get("/", clienteController.getAllClientes);
router.post("/", clienteController.createCliente);
router.get("/:id", clienteController.getClienteById);
router.put("/:id", clienteController.updateCliente);
router.delete("/:id", clienteController.deleteCliente);

module.exports = router;
