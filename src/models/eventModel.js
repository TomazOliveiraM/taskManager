const db = require('./db');

// Funções para manipular eventos no banco

exports.createEvent = (eventData, callback) => {
  const query = `INSERT INTO eventos (titulo, descricao, categoria, data, local, tipo, organizador_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    eventData.titulo,
    eventData.descricao,
    eventData.categoria,
    eventData.data,
    eventData.local,
    eventData.tipo,
    eventData.organizador_id
  ];
  db.query(query, params, callback);
};

exports.getEvents = (filters, callback) => {
  let query = 'SELECT * FROM eventos WHERE 1=1';
  const params = [];

  if (filters.categoria) {
    query += ' AND categoria = ?';
    params.push(filters.categoria);
  }
  if (filters.data) {
    query += ' AND data = ?';
    params.push(filters.data);
  }

  db.query(query, params, callback);
};

exports.getEventById = (id, callback) => {
  db.query('SELECT * FROM eventos WHERE id = ?', [id], callback);
};

exports.updateEvent = (id, eventData, callback) => {
  const query = `UPDATE eventos SET titulo = ?, descricao = ?, categoria = ?, data = ?, local = ?, tipo = ? WHERE id = ?`;
  const params = [
    eventData.titulo,
    eventData.descricao,
    eventData.categoria,
    eventData.data,
    eventData.local,
    eventData.tipo,
    id
  ];
  db.query(query, params, callback);
};

exports.deleteEvent = (id, callback) => {
  db.query('DELETE FROM eventos WHERE id = ?', [id], callback);
};
