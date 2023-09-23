import Joi from 'joi';

function createValidationSchema(maxAllowedValue) {
  return Joi.number()
    .required()
    .empty('')
    .positive()
    .greater(0)

    .less(maxAllowedValue)
    .messages({
      'any.required': `Please complete this field`,
      'number.base': 'Field must be a number',
      'number.positive': 'Number cannot be negative or 0',
      'number.less': `Number cannot be more than available`,
    });
}

export function validateData(data, maxAllowedValue) {
  const validationSchema = createValidationSchema(maxAllowedValue);
  return validationSchema.validate(data);
}
