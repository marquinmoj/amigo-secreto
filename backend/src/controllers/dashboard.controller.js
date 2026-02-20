import { getDashboard } from '../services/dashboard.service.js';

export const overview = async (req, res, next) => {
  try {
    const data = await getDashboard();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
