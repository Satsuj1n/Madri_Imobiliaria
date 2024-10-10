import { Response, NextFunction } from "express";
import { UserRequest } from "./types"; // Ajuste o caminho conforme sua estrutura de pastas

const checkAdmin = (req: UserRequest, res: Response, next: NextFunction): void => {
  const user = req.user;

  if (user && user.isAdmin) {
    next(); // Se o usuário é administrador, prossiga
  } else {
    res.status(403).json({
      message: "Acesso negado: somente administradores podem realizar esta ação",
    });
  }
};

export default checkAdmin;
