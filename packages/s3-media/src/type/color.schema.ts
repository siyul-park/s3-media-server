import Joi from "joi";
import rgbaSchema from "./rgba.schema";

const colorSchema = Joi.alternatives().try(Joi.string(), rgbaSchema);

export default colorSchema;
