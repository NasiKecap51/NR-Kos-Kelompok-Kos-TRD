import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/** CREATE SCHEMA WHEN AND NEW MENU'S DATA, ALL OF FIELDS HAVE TO BE REQUIRE */
const addDataSchema = Joi.object({
  room_number: Joi.number().min(0).required(),
  price: Joi.number().required(),
  room_capacity: Joi.number().required(),
  picture: Joi.string().optional(),
  user: Joi.optional(),
  deskripsi: Joi.string().required(), 
});

export const verifyAddMenu = (
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
  room_number: Joi.number().min(0).optional(),
  price: Joi.number().optional(),
  room_capacity: Joi.number().optional(),
  picture: Joi.string().optional(),
  user: Joi.optional(),
});

export const verifyidMenu = (
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