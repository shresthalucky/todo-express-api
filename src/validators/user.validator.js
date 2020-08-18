import Joi from '@hapi/joi';

import { BadRequestError } from '../helpers/error.helper';

const userSchema = Joi.object({
  username: Joi.string().min(1).max(20).required(),
  password: Joi.string().min(1).max(50).required()
});

export async function validator(req, res, next) {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(new BadRequestError(err.message));
  }
}

export default validator;
