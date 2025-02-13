const Usuario = require("../model/Usuario.js");
const Auth = require("../model/AuthPerfil.js");
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

// Buscar usuário por ID - Tela Perfil Usuario (MAIN)
exports.getPerfilByIdMain = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await Auth.findById(id);
    new_id = auth.usuarioId;
    const usuario = await Usuario.findById(new_id);

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
    console.log(id);
    const auth = await Auth.findById(id);
    new_id = auth.usuarioId;
    const { nome, apelido, email, genero, country, cpf, telefone } = req.body;
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      new_id,
      { nome, apelido, email, genero, country, cpf, telefone },
      { new: true, runValidators: true } // Retorna o documento atualizado
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
exports.deletePerfil = async (req, res) => {
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