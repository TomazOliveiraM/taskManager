require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta views
app.use(express.static(path.join(__dirname, 'views')));

// Usar rotas de usuário (/api/users)
app.use('/api/users', userRoutes);

// Rota raiz - enviar index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const eventRoutes = require('./routes/eventRoutes');

app.use('/api/events', eventRoutes);

const inscricaoRoutes = require('./routes/inscricaoRoutes');

app.use('/api/inscricoes', inscricaoRoutes);
