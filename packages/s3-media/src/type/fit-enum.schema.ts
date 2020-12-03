import Joi from "joi";

const fitEnumSchema = Joi.string().valid(
  "contain",
  "cover",
  "fill",
  "inside",
  "outside"
);

export default fitEnumSchema;
