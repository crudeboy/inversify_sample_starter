import { response } from "inversify-express-utils";
import { injectable } from "inversify";
import { ILocation } from "./../interfaces/ICountry";
import AppError from "../../../shared/utils/AppError";
// import fetch from "node-fetch";
import axios from "axios";

@injectable()
export default class countriesRepository {
  public async getAllCountries(): Promise<ILocation> {
    const response = await axios.get("https://countriesnow.space/api/v0.1/countries", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    });
    const countries = response.data.data.map((data: any) => {
      return data.country;
    });
    if (!countries) {
      throw new AppError("Error getting Countries", 404);
    }
    return countries;
  }

  public async getCities(country: string): Promise<ILocation> {
    const response = await axios.get("https://countriesnow.space/api/v0.1/countries", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    });
    const countries = response.data.data.filter((dat: any) => {
      return dat.country === country;
    });
    if (!countries) {
      throw new AppError("Error getting States", 404);
    }
    return countries[0].cities;
  }
}
