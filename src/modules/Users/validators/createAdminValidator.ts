import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IAdmin } from "../Interfaces/IAdmin";

export const CreateAdminSchema: JoiSchema<IAdmin> = {
  country: Joi.string().required(),
  email: Joi.string().email().required(),
};
