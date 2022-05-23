const express = require('express');
const router = express.Router();

const EventService = require('../services/EventService');

router.get(
  '/',
  async (req, res, next) => {
    try {
      const events = await EventService.getAll();

      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const event = await EventService.getById(parseInt(id));

      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  async (req, res, next) => {
    try {
      const { descricao, dataHora, categoria, endereco } = req.body;
      
      const event = await EventService.add(descricao, dataHora, categoria, endereco);

      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;