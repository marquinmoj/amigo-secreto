import Joi from 'joi';
import * as whatsappService from '../services/whatsapp.service.js';

export const createNumberSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required()
});

export const listNumbers = async (req, res, next) => {
  try {
    const numbers = await whatsappService.listNumbers();
    return res.json(numbers);
  } catch (error) {
    return next(error);
  }
};

export const createNumber = async (req, res, next) => {
  try {
    const number = await whatsappService.createNumber(req.body);
    return res.status(201).json(number);
  } catch (error) {
    return next(error);
  }
};

export const connectNumber = (io) => async (req, res, next) => {
  try {
    await whatsappService.connectNumber(req.params.numberId, io);
    return res.json({ message: 'Conectando número' });
  } catch (error) {
    return next(error);
  }
};
