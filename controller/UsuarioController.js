const Usuario = require("../model/Usuario.js");

// Buscar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha, moedasNaCarteira } = req.body;
    // Validação de campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    // Verificar se o e-mail já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }
    // Criar o novo usuário
    const novoUsuario = new Usuario({ 
      nome, 
      email, 
      senha, 
      moedasNaCarteira: moedasNaCarteira || [] // Garantir um valor padrão
    });
    // Salvar no banco de dados
    const usuarioSalvo = await novoUsuario.save();
    // Retornar o usuário salvo
    res.status(201).json(usuarioSalvo);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login de usuário
exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Verificar se os campos foram preenchidos
    if (!email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    // Procurar o usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // Validar a senha
    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }
    res.status(200).json({ 
      message: "Login realizado com sucesso.",
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        moedasNaCarteira: usuario.moedasNaCarteira,
      }
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Redefinir senha do usuário
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Verificar se o e-mail foi fornecido
    if (!email) {
      return res.status(400).json({ error: "E-mail não fornecido." });
    }
    // Buscar o usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // Gerar uma nova senha temporária simples
    const novaSenha = Math.random().toString(36).slice(-8); // Gera uma string aleatória de 8 caracteres
    // Atualizar o usuário com a nova senha
    usuario.senha = novaSenha;
    await usuario.save();
    res.status(200).json({ 
      message: "Senha redefinida com sucesso. Confira sua nova senha.",
      novaSenha 
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Buscar usuário por ID
exports.getUserById = async (req, res) => {
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

// Atualizar informações de um usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, moedasNaCarteira } = req.body;
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, email, senha, moedasNaCarteira },
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