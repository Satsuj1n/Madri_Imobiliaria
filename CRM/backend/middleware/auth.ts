import passport from "passport";
import { Response, NextFunction } from "express";
import { UserRequest } from "./types"; // Ajuste o caminho conforme necessário

// Middleware para autenticar usando JWT sem sessão
const auth = (req: UserRequest, res: Response, next: NextFunction): void => {
  console.log("Token recebido:", req.headers.authorization);
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: UserRequest["user"]) => {
      if (err || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Anexa o usuário ao req se a autenticação for bem-sucedida
      req.user = user as UserRequest["user"]; // Especifica o tipo para garantir que o TypeScript compreenda
      next();
    }
  )(req, res, next);
};

export default auth;
