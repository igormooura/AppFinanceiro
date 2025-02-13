const mongoose = require("mongoose");
const AuthPerfil = require("../model/AuthPerfil.js");
const Usuario = require("../model/Usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Criar um novo Usuario - Tela Cadastro
exports.createUser = async (req, res) => {
  const session = await mongoose.startSession(); // Inicia uma sessão para transação
  session.startTransaction();

  try {
    const { nome, sobrenome, genero, country, email, senha, telefone, cpf } = req.body;

    
    if (!email || !senha || !nome) {
      return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos." });
    }

    //criptografar a senha
    const hashedPwd = await bcrypt.hash(senha, 10);

    // Verifica se o e-mail já existe
    const usuarioExistente = await AuthPerfil.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Criação do perfil de usuário
    const novoUsuario = new Usuario({
      nome,
      sobrenome,
      genero,
      country,
      email,
      cpf,
      telefone
    });
    const usuarioSalvo = await novoUsuario.save({ session });

    // Criação das credenciais de autenticação
    const novoAuthPerfil = new AuthPerfil({
      email,
      senha: hashedPwd,
      usuarioId: usuarioSalvo._id,
    });

    const authSalvo = await novoAuthPerfil.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ usuario: usuarioSalvo, auth: authSalvo });
  } catch (error) {
    await session.abortTransaction(); 
    session.endSession();

    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login de usuário - Tela Login
exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email },
      "seuSegredoSuperSecreto", // vamos ter q substituir no .env
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Redefinir senha do usuário - Tela esqueci a senha
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar se o e-mail foi fornecido
    if (!email) {
      return res.status(400).json({ error: "E-mail não fornecido." });
    }


    // Buscar o usuário pelo e-mail
    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }


    // Gerar uma nova senha temporária simples
    const novaSenha = Math.random().toString(36).slice(-8); // Gera uma string aleatória de 8 caracteres
    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

    usuario.senha = hashedNovaSenha;
    await usuario.save();

    
    res.status(200).json({
      message: "Senha redefinida com sucesso. Confira sua nova senha.",
      novaSenha,
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
