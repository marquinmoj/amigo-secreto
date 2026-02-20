import Joi from 'joi';
import * as chatService from '../services/chat.service.js';

export const assignSchema = Joi.object({
  chatId: Joi.string().required(),
  agentId: Joi.string().required()
});

export const manualAssign = async (req, res, next) => {
  try {
    const chat = await chatService.manualAssignChat(req.body.chatId, req.body.agentId, req.user.id);
    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const autoAssign = async (req, res, next) => {
  try {
    const chat = await chatService.autoAssignChat(req.params.chatId);
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
