import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { inject } from "inversify";
import { controller, httpGet, next, request, response } from "inversify-express-utils";
import CountriesService from "../services/Countries.service";
import { BaseController } from "../../../shared/helpers/base";

@controller("/location")
export class CountriesController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.COUNTRIES_SERVICE) private readonly countriesService: CountriesService;

  @httpGet("/countries")
  async getCountries(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const users = await this.countriesService.getAllCountries();
      return this.resSuccess({ res, data: users });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/cities")
  async getCities(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const country = req.body.countries;
      const cities = await this.countriesService.getCities(country);
      return this.resSuccess({ res, data: cities });
    } catch (error) {
      return next(error);
    }
  }
}
