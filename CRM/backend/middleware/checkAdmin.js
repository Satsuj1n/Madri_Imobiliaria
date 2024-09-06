module.exports = (req, res, next) => {
  const user = req.user; // Supomos que req.user já tenha sido preenchido com o cliente autenticado

  if (user && user.isAdmin) {
    next(); // Se o usuário for admin, prossiga para a rota
  } else {
    res
      .status(403)
      .json({
        message:
          "Acesso negado: somente administradores podem realizar esta ação",
      });
  }
};
