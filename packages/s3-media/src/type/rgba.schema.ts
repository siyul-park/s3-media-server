import Joi from "joi";

const rgbaSchema = Joi.object({
  r: Joi.number().optional(),
  g: Joi.number().optional(),
  b: Joi.number().optional(),
  s: Joi.number().optional(),
});

export default rgbaSchema;
