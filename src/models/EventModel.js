const connection = require('../models/db');

const getAll = async () => {
  const [events] = await connection.execute(
    'SELECT O.id_ocorrencia, O.descricao, O.data_hora, O.categoria, E.logradouro, E.numero, E.bairro, E.cep ' +
    'FROM `ocorrencias-cidade`.ocorrencias O ' +
    'INNER JOIN `ocorrencias-cidade`.endereco E ' +
    'ON E.id_endereco = O.id_endereco;',
  );

  return events;
};

const getById = async (id) => {
  const [event] = await connection.execute(
    'SELECT O.id_ocorrencia, O.descricao, O.data_hora, O.categoria, E.logradouro, E.numero, E.bairro, E.cep ' +
    'FROM `ocorrencias-cidade`.ocorrencias O ' +
    'INNER JOIN `ocorrencias-cidade`.endereco E ' +
    'ON E.id_endereco = O.id_endereco ' +
    'WHERE id_ocorrencia = ?; ',
    [id],
  );

  return event;
};

const add = async (descricao, dataHora, categoria, endereco) => {
  const [ rowE ] = await connection.execute(
    'INSERT INTO `ocorrencias-cidade`.endereco (logradouro, numero, bairro, cep) ' +
    'VALUES (?, ?, ?, ?)',
    [endereco.logradouro, endereco.numero, endereco.bairro, endereco.cep],
  );

  const { insertId: idEndereco } = rowE;

  const [ rowO ] = await connection.execute(
    'INSERT INTO `ocorrencias-cidade`.ocorrencias (descricao, categoria, data_hora, id_endereco) ' +
    'VALUES (?, ?, ?, ?);',
    [descricao, categoria, dataHora, idEndereco],
  );

  const { insertId: idOcorrencia } = rowO;

  return [{
    idOcorrencia,
    descricao,
    categoria,
    dataHora,
    endereco,
  }];
}

const EventModel = {
  getAll,
  getById,
  add,
};

module.exports = EventModel;
