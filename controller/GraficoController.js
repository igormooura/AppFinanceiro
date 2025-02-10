const Grafico = require("../model/Grafico.js");
const Usuario = require("../model/Usuario.js");
const mongoose = require("mongoose");
// Criar um novo gráfico e associá-lo a um usuário
exports.createGrafico = async (req, res) => {
  try {
    const { moeda1, value, moeda2 } = req.body;
    
    const userId = req.params.userId; // Get userId from URL parameter
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido." });
    }
    if (!moeda1 || value === undefined || !moeda2 || !userId) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    console.log(userId);
    const usuario = await Usuario.findById(userId);
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (usuario.graficos.length >= 3) {
      return res.status(400).json({ error: "Usuário já possui o máximo de 3 gráficos." });
    }

    const graficoSalvo = new Grafico({
      moeda1,
      valor: value,
      moeda2,
      user_id: userId,
    });

    await graficoSalvo.save();
    usuario.graficos.push(graficoSalvo._id);
    await usuario.save();

    res.status(201).json(graficoSalvo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar gráfico." });
  }
};

// Obter todos os gráficos de um usuário
exports.getGraficoByUser = async (req, res) => {
  const user_id = req.params.userId; 

  try {
    const graficoList = await Grafico.find({ user_id }); 
    res.status(200).json(graficoList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grafico', error });
  }
}

// Deletar um gráfico e removê-lo do usuário
exports.deleteGrafico = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const graficoDeletado = await Grafico.findByIdAndDelete(id);
    if (!graficoDeletado) {
      return res.status(404).json({ error: "Gráfico não encontrado." });
    }

    // Remove o gráfico do usuário
    await Usuario.findByIdAndUpdate(userId, {
      $pull: { graficos: id },
    });

    res.status(200).json({ message: "Gráfico deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar gráfico." });
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