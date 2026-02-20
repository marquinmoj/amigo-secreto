import Joi from 'joi';
import { prisma } from '../config/prisma.js';

export const stageSchema = Joi.object({ name: Joi.string().required(), position: Joi.number().required() });

export const moveSchema = Joi.object({ stageId: Joi.string().required() });

export const listPipeline = async (req, res, next) => {
  try {
    const stages = await prisma.pipelineStage.findMany({
      orderBy: { position: 'asc' },
      include: {
        opportunities: { include: { contact: true } }
      }
    });
    res.json(stages);
  } catch (error) {
    next(error);
  }
};

export const createStage = async (req, res, next) => {
  try {
    const stage = await prisma.pipelineStage.create({ data: req.body });
    res.status(201).json(stage);
  } catch (error) {
    next(error);
  }
};

export const moveOpportunity = async (req, res, next) => {
  try {
    const opportunity = await prisma.opportunity.update({
      where: { id: req.params.id },
      data: { stageId: req.body.stageId }
    });
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
};
