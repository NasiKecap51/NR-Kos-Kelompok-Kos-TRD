import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).alphanum().required(),
});

export const verifyAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = authSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

/** CREATE SCHEMA WHEN AND NEW USER'S DATA, ALL OF FIELDS HAVE TO BE REQUIRE */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    nomortlp: Joi.string().required(),    password: Joi.string().required(),
    role: Joi.string().required(),
    user: Joi.optional(),
  });
  
  export const verifyAddUser = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { error } = addDataSchema.validate(request.body);
  
    if (error) {
      return response.status(400).json({
        status: false,
        message: error.message,
      });
    }
    next();
  };
  
  const idDataSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().min(0).optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    user: Joi.optional(),
  });
  
  export const verifyidUser = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { error } = idDataSchema.validate(request.body);
  
    if (error) {
      return response.status(400).json({
        status: false,
        message: error.message,
      });
    }
    next();
  };
