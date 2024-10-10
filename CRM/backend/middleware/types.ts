import { Request } from "express";

// Define o tipo User para o usuário autenticado
export interface User {
  isAdmin: boolean;
  // Adicione outras propriedades, como id, email, etc, se necessário
}

// Estende o Request do Express para incluir o tipo do usuário
export interface UserRequest extends Request {
  user?: User;
}
