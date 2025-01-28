const Grafico = require("../model/Grafico.js");

// Criar um novo gráfico
exports.createGrafico = async (req, res) => {
  try {
    const moeda = req.body.moeda1;
    const valor = req.body.value;
    const variavel = req.body.moeda2;

    if (!moeda || valor === undefined || variavel === undefined) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    const novoGrafico = new Grafico({ moeda, valor, variavel });
    const graficoSalvo = await novoGrafico.save();
    res.status(201).json(graficoSalvo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar gráfico." });
  }
};

// Obter todos os gráficos
exports.getAllGraficos = async (req, res) => {
  try { 
    const graficos = await Grafico.find();
    res.status(200).json(graficos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gráficos." });
  }
};

// Obter um gráfico por ID
exports.getGraficoById = async (req, res) => {
  try {
    const { id } = req.params;
    const grafico = await Grafico.findById(id);
    console.log(grafico);
    if (!grafico) {
      return res.status(404).json({ error: "Gráfico não encontrado." });
    }
    res.status(200).json(grafico);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gráfico." });
  }
};

// Atualizar um gráfico
exports.updateGrafico = async (req, res) => {
  try {
    const { id } = req.params;
    const { moeda, valor, variavel } = req.body;
    const graficoAtualizado = await Grafico.findByIdAndUpdate(
      id,
      { moeda, valor, variavel },
      { new: true } // Retorna o documento atualizado
    );
    if (!graficoAtualizado) {
      return res.status(404).json({ error: "Gráfico não encontrado." });
    }
    res.status(200).json(graficoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar gráfico." });
  }
};

// Deletar um gráfico
exports.deleteGrafico = async (req, res) => {
  try {
    const { id } = req.params;
    const graficoDeletado = await Grafico.findByIdAndDelete(id);
    console.log(id);
    if (!graficoDeletado) {
      return res.status(404).json({ error: "Gráfico não encontrado." });
    }
    res.status(200).json({ message: "Gráfico deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar gráfico." });
  }
};
exports.getGraficoByMoeda = async (req, res) => {
  try {
    const { moeda } = req.params;
    const grafico = await Grafico.findOne({ moeda: moeda.toUpperCase() }); 
    if (!grafico) {
      return res.status(404).json({ error: "Gráfico não encontrado para essa moeda." });
    }
    res.status(200).json(grafico);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gráfico." });
  }
};
