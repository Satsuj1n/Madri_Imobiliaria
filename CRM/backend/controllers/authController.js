router.post("/signup", async (req, res) => {
  const { email, senha, nomeRazaoSocial, cpfCnpj, telefone, relacionamento } =
    req.body;

  // Log dos dados recebidos no backend
  console.log(
    "Recebendo requisição de signup com os seguintes dados:",
    req.body
  );

  try {
    // Verificar se o usuário já existe
    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      console.log(`Usuário com o email ${email} já existe.`);
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criar um novo usuário
    cliente = new Cliente({
      email,
      senha,
      nomeRazaoSocial,
      cpfCnpj,
      telefone,
      relacionamento,
      isAdmin: false, // isAdmin sempre será falso no momento do cadastro
    });

    console.log(
      "Cliente criado com sucesso, prestes a salvar no banco de dados:",
      cliente
    );

    // Salvar o cliente no banco de dados
    await cliente.save();

    console.log("Cliente salvo com sucesso no banco de dados");

    // Retornar a resposta de sucesso
    return res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    // Tratamento de erro
    console.error("Erro ao registrar o usuário:", err);
    return res
      .status(500)
      .json({ message: "Erro no registro. Por favor, tente novamente." });
  }
});
