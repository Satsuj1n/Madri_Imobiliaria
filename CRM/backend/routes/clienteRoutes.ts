import express from "express";
import * as clienteController from "../controllers/clienteController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Definir as rotas de CRUD para Clientes com asyncHandler
router.get("/", asyncHandler(clienteController.getAllClientes));
router.post("/", asyncHandler(clienteController.createCliente));
router.get("/:id", asyncHandler(clienteController.getClienteById));
router.put("/:id", asyncHandler(clienteController.updateCliente));
router.delete("/:id", asyncHandler(clienteController.deleteCliente));

export default router;
