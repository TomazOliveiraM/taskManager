const db = require('./db');

// Função para criar inscrição de usuário em evento
exports.createInscricao = (usuario_id, evento_id, callback) => {
  const query = 'INSERT INTO inscricoes (usuario_id, evento_id) VALUES (?, ?)';
  db.query(query, [usuario_id, evento_id], callback);
};

// Função para listar inscrições de um usuário
exports.getInscricoesByUsuario = (usuario_id, callback) => {
  const query = `
    SELECT i.id, e.titulo, e.data, e.local
    FROM inscricoes i
    JOIN eventos e ON i.evento_id = e.id
    WHERE i.usuario_id = ?
  `;
  db.query(query, [usuario_id], callback);
};

// Função para cancelar inscrição
exports.deleteInscricao = (usuario_id, evento_id, callback) => {
  const query = 'DELETE FROM inscricoes WHERE usuario_id = ? AND evento_id = ?';
  db.query(query, [usuario_id, evento_id], callback);
};
