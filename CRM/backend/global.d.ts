import express from "express";

declare global {
  namespace Express {
    interface User {
      isAdmin: boolean;
      // Adicione outras propriedades conforme necessário, como userId, email, etc.
    }
  }
}
