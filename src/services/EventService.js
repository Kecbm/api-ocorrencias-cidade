const EventModel = require('../models/EventModel');

const reorganizeEvent = (event) => ({
  idOcorrencia: event.id_ocorrencia,
  descricao: event.descricao,
  categoria: event.categoria,
  dataHora: event.data_hora,
  endereco: {
    logradouro: event.logradouro,
    numero: event.numero,
    bairro: event.bairro,
    cep: event.cep,
  },
});

const getAll = async () => {
  const events = await EventModel.getAll();

  return events.map(reorganizeEvent);
};

const getById = async (id) => {
  const event = await EventModel.getById(id);

  return event.map(reorganizeEvent);
};

const add = async (descricao, dataHora, categoria, endereco) => {
  const event = await EventModel.add(descricao, dataHora, categoria, endereco);

  return event;
};

const EventService = {
  getAll,
  getById,
  add,
};

module.exports = EventService;
