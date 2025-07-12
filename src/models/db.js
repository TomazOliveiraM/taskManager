// Importa o pacote mysql2 para conexão com MySQL
const mysql = require('mysql2');

// Importa o dotenv para carregar variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');
dotenv.config(); // Carrega as variáveis de ambiente

// Cria a conexão com o banco usando as variáveis do .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,     // Host do banco, ex: localhost
  user: process.env.DB_USER,     // Usuário do banco, ex: root
  password: process.env.DB_PASS, // Senha do banco
  database: process.env.DB_NAME  // Nome do banco de dados
});

// Tenta conectar ao banco e verifica se ocorreu erro
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err); // Mostra erro se falhar
  } else {
    console.log('Conectado ao banco MySQL!');          // Mensagem sucesso
  }
});

// Exporta a conexão para usar em outros arquivos
module.exports = connection;
