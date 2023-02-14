import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { upload } from "@shared/middlewares/fileUpload";
import { validate } from "@shared/middlewares/validation";
import { inject } from "inversify";
import { controller, httpPost, next, request, response } from "inversify-express-utils";
import { NextFunction } from "express";

@controller("/upload")
export class UploadController extends BaseController {
  @httpPost("/", upload.single("file"))
  async signUp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const image: any = req.file;
      // console.log(image, "image");

      return this.resSuccess({ res, data: "", message: "success_message" });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }
}
