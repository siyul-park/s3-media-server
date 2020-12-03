import Joi from "joi";
import fitEnumSchema from "./fit-enum.schema";
import colorSchema from "./color.schema";
import kernelEnumSchema from "./kernel-enum.schema";

const stylePatchSchema = Joi.object({
  width: Joi.number().optional(),

  height: Joi.number().optional(),

  fit: fitEnumSchema.optional(),

  position: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),

  background: colorSchema.optional(),

  kernel: kernelEnumSchema.optional(),

  withoutEnlargement: Joi.boolean().optional(),

  fastShrinkOnLoad: Joi.boolean().optional(),
});

export default stylePatchSchema;
