import { REPOSITORIES } from "./../../../shared/constants/identifiers";
import { ILocation } from "./../interfaces/ICountry";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import CountriesRepository from "../repositories/countries.repositories";

@injectable()
export default class CountriesService {
  private countriesRepository: CountriesRepository;

  constructor(
    @inject(REPOSITORIES.COUNTRIES_RESPOSITORY)
    countriesRepository: CountriesRepository
  ) {
    this.countriesRepository = countriesRepository;
  }

  public async getAllCountries(): Promise<ILocation> {
    const countries = await this.countriesRepository.getAllCountries();
    if (!countries) {
      throw new AppError("Error occurred while fetching all countries.", 400);
    }
    return countries;
  }

  public async getCities(country: string): Promise<ILocation> {
    const cities = await this.countriesRepository.getCities(country);
    if (!cities) {
      throw new AppError("State not found", 404);
    }
    return cities;
  }
}
