const Imovel = require("../models/Imovel");

// Função para listar todos os imóveis
exports.getAllImoveis = async (req, res) => {
  try {
    const imoveis = await Imovel.find();
    res.json(imoveis);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imóveis" });
  }
};

// Função para criar um novo imóvel
exports.createImovel = async (req, res) => {
  const { cliente, condominio, endereco, preco } = req.body;

  const novoImovel = new Imovel({
    cliente,
    condominio,
    endereco,
    preco,
    status: "pendente", // Imóvel começa como "pendente"
  });

  try {
    const imovel = await novoImovel.save();
    res.status(201).json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar imóvel" });
  }
};

// Função para buscar um imóvel por ID
exports.getImovelById = async (req, res) => {
  try {
    const imovel = await Imovel.findById(req.params.id);
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imóvel" });
  }
};

// Função para atualizar um imóvel existente
exports.updateImovel = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar imóvel" });
  }
};

// Função para deletar um imóvel
exports.deleteImovel = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndDelete(req.params.id);
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json({ message: "Imóvel deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar imóvel" });
  }
};

// Função para aprovar um imóvel (somente admins)
exports.aprovarImovel = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(
      req.params.id,
      { status: "aprovado" },
      { new: true }
    );
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json({ message: "Imóvel aprovado com sucesso", imovel });
  } catch (err) {
    res.status(500).json({ error: "Erro ao aprovar imóvel" });
  }
};
