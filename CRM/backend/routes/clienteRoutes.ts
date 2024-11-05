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

// Rota para alterar a senha do cliente
router.put(
  "/:id/alterar-senha",
  asyncHandler(clienteController.updateClienteSenha)
);

// Nova rota para enviar o e-mail de recuperação de senha
router.post("/send_recovery_email", asyncHandler(clienteController.sendRecoveryEmail));
// Nova rota para redefinir senha usando o e-mail
router.put("/redefinir-senha", asyncHandler(clienteController.redefinirSenha));

export default router;
