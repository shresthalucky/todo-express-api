import Joi from '@hapi/joi';

import { BadRequestError } from '../helpers/error.helper';

const todoSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500).required(),
  status: Joi.string().valid('active', 'done').required()
});

/**
 * Validate request body.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function validator(req, res, next) {
  try {
    await todoSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(new BadRequestError(err.message));
  }
}

export default validator;
