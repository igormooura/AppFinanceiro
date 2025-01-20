const Usuario = require("../model/Usuario.js");

// Buscar todos os usuários
exports.getAllPerfis = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Buscar usuário por ID - Tela Perfil Usuario
exports.getPerfilById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// Atualizar informações de um usuário - Tela Perfil Usuario
exports.updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, apelido, email, genero, country } = req.body;
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, apelido, email, genero, country },
      { new: true } // Retorna o documento atualizado
    );
    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await Usuario.findByIdAndDelete(id);
    if (!usuarioDeletado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};