import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IFranchisee, IUser } from "../Interfaces/IUser";

export const CreateUserSchema: JoiSchema<IUser> = {
  user_type: Joi.string().valid("client", "creative", "sub_franchise").required(),
  full_name: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  profession: Joi.string().when('user_type', { is: "creative", then: Joi.required(), otherwise: Joi.optional() }),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "binary"),

};

export const CreateSubFranchiseeSchema: JoiSchema<IUser> = {
  full_name: Joi.string().required(),
  password: Joi.string().optional(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  profession: Joi.string().optional(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "binary"),
  user_type: Joi.string().valid("sub_franchise").required(),
};

export const CreateFranchiseeSchema: JoiSchema<IFranchisee> = {
  full_name: Joi.string().required(),
  password: Joi.string().optional(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  profession: Joi.string().optional(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "binary"),
  user_type: Joi.string().valid("franchisee"),
};
