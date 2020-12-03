import Joi from "joi";

const kernelEnumSchema = Joi.string().valid(
  "nearest",
  "cubic",
  "mitchell",
  "lanczos2",
  "lanczos3"
);

export default kernelEnumSchema;
