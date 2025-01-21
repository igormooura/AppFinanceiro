const AuthPerfil = require("../model/AuthPerfil.js");
// Criar um novo Usuario - Tela Cadastro
const Usuario = require("../model/Usuario.js");

exports.createUser = async (req, res) => {
  const session = await mongoose.startSession(); // Inicia uma sessão para transação
  session.startTransaction();

  try {
    const { nome, apelido, genero, country, email, senha } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    // Verifica se o e-mail já existe
    const usuarioExistente = await AuthPerfil.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Criação do perfil de usuário
    const novoUsuario = new Usuario({ nome, apelido, genero, country, email });
    const usuarioSalvo = await novoUsuario.save({ session });

    // Criação das credenciais de autenticação
    const novoAuthPerfil = new AuthPerfil({
      email,
      senha,
      usuarioId: usuarioSalvo._id
    });

    const authSalvo = await novoAuthPerfil.save({ session });

    await session.commitTransaction(); // Confirma a transação
    session.endSession();

    res.status(201).json({ usuario: usuarioSalvo, auth: authSalvo });
  } catch (error) {
    await session.abortTransaction(); // Desfaz a transação em caso de erro
    session.endSession();

    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login de usuário - Tela Login
exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Verificar se os campos foram preenchidos
    if (!email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    // Procurar o usuário pelo e-mail
    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // Validar a senha
    if (usuario.senha != senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }
    res.status(200).json({ 
      message: "Login realizado com sucesso.",
      usuario: {
        id: usuario._id,
        email: usuario.email,
      }
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