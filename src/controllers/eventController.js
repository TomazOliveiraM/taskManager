// Lógica dos eventos
const eventModel = require('../models/eventModel');

// Criar evento
exports.create = (req, res) => {
  const eventData = req.body;
  eventModel.createEvent(eventData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar evento' });
    res.status(201).json({ message: 'Evento criado', id: result.insertId });
  });
};

// Listar eventos (com filtros opcionais)
exports.list = (req, res) => {
  const filters = req.query;
  eventModel.getEvents(filters, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar eventos' });
    res.json(results);
  });
};

// Obter evento por id
exports.getById = (req, res) => {
  const id = req.params.id;
  eventModel.getEventById(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar evento' });
    if (results.length === 0) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(results[0]);
  });
};

// Atualizar evento
exports.update = (req, res) => {
  const id = req.params.id;
  const eventData = req.body;
  eventModel.updateEvent(id, eventData, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar evento' });
    res.json({ message: 'Evento atualizado' });
  });
};

// Deletar evento
exports.delete = (req, res) => {
  const id = req.params.id;
  eventModel.deleteEvent(id, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao deletar evento' });
    res.json({ message: 'Evento deletado' });
  });
};

// Criar evento (pegando organizador do token)
exports.create = (req, res) => {
  const organizador_id = req.usuario.id;
  const eventData = {
    ...req.body,
    organizador_id
  };

  eventModel.createEvent(eventData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar evento' });
    res.status(201).json({ message: 'Evento criado com sucesso', id: result.insertId });
  });
};
