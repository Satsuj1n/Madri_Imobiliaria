const Atendimento = require("../models/atendimento");

// Função para buscar todos os atendimentos
exports.getAllAtendimentos = async (req, res) => {
  try {
    const atendimentos = await Atendimento.find()
      .populate("cliente")
      .populate("imovel")
      .populate("condominio");
    res.json(atendimentos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar atendimentos" });
  }
};

// Função para criar um novo atendimento
exports.createAtendimento = async (req, res) => {
  const {
    cliente,
    imovel,
    condominio,
    dataAtendimento,
    status,
    tipoAtendimento,
    observacoes,
    responsavelAtendimento,
  } = req.body;

  const novoAtendimento = new Atendimento({
    cliente,
    imovel,
    condominio,
    dataAtendimento,
    status,
    tipoAtendimento,
    observacoes,
    responsavelAtendimento,
  });

  try {
    const atendimento = await novoAtendimento.save();
    res.status(201).json(atendimento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar atendimento" });
  }
};

// Função para buscar um atendimento pelo ID
exports.getAtendimentoById = async (req, res) => {
  try {
    const atendimento = await Atendimento.findById(req.params.id)
      .populate("cliente")
      .populate("imovel")
      .populate("condominio");
    if (!atendimento)
      return res.status(404).json({ error: "Atendimento não encontrado" });
    res.json(atendimento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar atendimento" });
  }
};

// Função para atualizar um atendimento
exports.updateAtendimento = async (req, res) => {
  try {
    const atendimento = await Atendimento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!atendimento)
      return res.status(404).json({ error: "Atendimento não encontrado" });
    res.json(atendimento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar atendimento" });
  }
};

// Função para deletar um atendimento
exports.deleteAtendimento = async (req, res) => {
  try {
    const atendimento = await Atendimento.findByIdAndDelete(req.params.id);
    if (!atendimento)
      return res.status(404).json({ error: "Atendimento não encontrado" });
    res.json({ message: "Atendimento deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar atendimento" });
  }
};
