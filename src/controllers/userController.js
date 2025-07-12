// Importa a conexão com o banco e bibliotecas necessárias
const db = require('../models/db');
const bcrypt = require('bcryptjs');      // Para criptografar senhas
const jwt = require('jsonwebtoken');     // Para gerar token JWT
const dotenv = require('dotenv');
dotenv.config();

// Função para registrar usuário
exports.register = (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  // Criptografa a senha (hash)
  const hashedPassword = bcrypt.hashSync(senha, 8);

  // Insere novo usuário no banco
  const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, hashedPassword, tipo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  });
};

// Função para login do usuário
exports.login = (req, res) => {
  const { email, senha } = req.body;

  // Busca usuário pelo email
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Compara a senha enviada com o hash no banco
    const passwordIsValid = bcrypt.compareSync(senha, user.senha);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gera token JWT (expira em 24h)
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Retorna token e dados do usuário
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  });
};
