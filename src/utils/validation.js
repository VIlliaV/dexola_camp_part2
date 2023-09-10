import Joi from 'joi';

const validationSchema = Joi.object({});

export function validateData(data) {
  return validationSchema.validate(data);
}
