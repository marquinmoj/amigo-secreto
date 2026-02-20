import Joi from 'joi';
import { getBotConfig, upsertBotConfig } from '../services/bot.service.js';

export const botSchema = Joi.object({
  welcomeMessage: Joi.string().required(),
  outOfOfficeMessage: Joi.string().required(),
  keywordResponses: Joi.object().required(),
  businessHoursStart: Joi.string().required(),
  businessHoursEnd: Joi.string().required(),
  timezone: Joi.string().required()
});

export const getConfig = async (req, res, next) => {
  try {
    const config = await getBotConfig();
    res.json(config);
  } catch (error) {
    next(error);
  }
};

export const saveConfig = async (req, res, next) => {
  try {
    const config = await upsertBotConfig(req.body);
    res.json(config);
  } catch (error) {
    next(error);
  }
};
