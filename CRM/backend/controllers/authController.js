router.post("/signup", async (req, res) => {
  const { email, senha, nomeRazaoSocial, cpfCnpj, telefone, relacionamento } =
    req.body;

  console.log("Recebendo requisição de signup com dados:", req.body);

  try {
    // Verificar se o usuário já existe
    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      console.log("Usuário já existe:", email);
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

    console.log("Cliente salvo no banco de dados");

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error("Erro ao registrar o usuário:", err);
    res.status(500).json({ message: "Erro no registro" });
  }
});
