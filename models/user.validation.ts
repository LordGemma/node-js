import Joi from "joi";
import { Request, NextFunction } from "express";

export const userDataSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

export function validateRequest(req: Request, next: NextFunction) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = userDataSchema.validate(req.body, options);

  if (error) {
    next(
      `Validation error: ${error.details
        .map((x: { message: string }) => x.message)
        .join(", ")}`
    );
  } else {
    req.body = value;
    next();
  }
}
