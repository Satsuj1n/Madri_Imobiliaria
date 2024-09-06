const Condominio = require("../models/condominio");

// Função para buscar todos os condomínios
exports.getAllCondominios = async (req, res) => {
  try {
    const condominios = await Condominio.find();
    res.json(condominios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar condomínios" });
  }
};

// Função para criar um novo condomínio
exports.createCondominio = async (req, res) => {
  const {
    nome,
    tipoCondominio,
    construtora,
    areaLoteTerreno,
    cidade,
    bairro,
    endereco,
    numero,
    caracteristicasExtrasCondominio,
    caracteristicasExtrasImovel,
  } = req.body;

  const novoCondominio = new Condominio({
    nome,
    tipoCondominio,
    construtora,
    areaLoteTerreno,
    cidade,
    bairro,
    endereco,
    numero,
    caracteristicasExtrasCondominio,
    caracteristicasExtrasImovel,
  });

  try {
    const condominio = await novoCondominio.save();
    res.status(201).json(condominio);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar condomínio" });
  }
};

// Função para buscar um condomínio pelo ID
exports.getCondominioById = async (req, res) => {
  try {
    const condominio = await Condominio.findById(req.params.id);
    if (!condominio)
      return res.status(404).json({ error: "Condomínio não encontrado" });
    res.json(condominio);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar condomínio" });
  }
};

// Função para atualizar um condomínio
exports.updateCondominio = async (req, res) => {
  try {
    const condominio = await Condominio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!condominio)
      return res.status(404).json({ error: "Condomínio não encontrado" });
    res.json(condominio);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar condomínio" });
  }
};

// Função para deletar um condomínio
exports.deleteCondominio = async (req, res) => {
  try {
    const condominio = await Condominio.findByIdAndDelete(req.params.id);
    if (!condominio)
      return res.status(404).json({ error: "Condomínio não encontrado" });
    res.json({ message: "Condomínio deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar condomínio" });
  }
};
