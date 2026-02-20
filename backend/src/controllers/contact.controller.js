import Joi from 'joi';
import { prisma } from '../config/prisma.js';

export const upsertContactSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  name: Joi.string().allow('', null),
  state: Joi.string().valid('NEW', 'QUALIFIED', 'NEGOTIATION', 'WON', 'LOST').optional(),
  tags: Joi.array().items(Joi.string()).default([])
});

export const upsertContact = async (req, res, next) => {
  try {
    const { phoneNumber, name, state, tags } = req.body;
    const contact = await prisma.contact.upsert({
      where: { phoneNumber },
      update: { name, state, tags },
      create: { phoneNumber, name, state, tags }
    });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const listContacts = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({ include: { chats: { include: { messages: true } } } });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
