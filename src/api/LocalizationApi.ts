import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type {
  CountryInfo,
  CultureDto,
  LocalizationOption,
  ParentalRating,
} from "@jellyfin/sdk/lib/generated-client/models";

export class LocalizationApi extends BaseApi {
  /**
   * Gets known countries
   *
   * Retrieves the list of country metadata known to the server.
   *
   * @returns {Promise<CountryInfo[]>} A promise that resolves to the known
   *                                   countries.
   */
  public getCountries() {
    return new RequestBuilder<CountryInfo[]>(this.configuration)
      .withEndpoint("/Localization/Countries")
      .build();
  }

  /**
   * Gets known cultures
   *
   * Retrieves the list of culture metadata known to the server.
   *
   * @returns {Promise<CultureDto[]>} A promise that resolves to the known
   *                                  cultures.
   */
  public getCultures() {
    return new RequestBuilder<CultureDto[]>(this.configuration)
      .withEndpoint("/Localization/Cultures")
      .build();
  }

  /**
   * Gets localization options
   *
   * Retrieves configurable localization values exposed by the server.
   *
   * @returns {Promise<LocalizationOption[]>}
   * A promise that resolves to the localization options.
   */
  public getLocalizationOptions() {
    return new RequestBuilder<LocalizationOption[]>(this.configuration)
      .withEndpoint("/Localization/Options")
      .build();
  }

  /**
   * Gets known parental ratings
   *
   * Retrieves the list of parental ratings known to the server.
   *
   * @returns {Promise<ParentalRating[]>} A promise that resolves to the known
   *                                      parental ratings.
   */
  public getParentalRatings() {
    return new RequestBuilder<ParentalRating[]>(this.configuration)
      .withEndpoint("/Localization/ParentalRatings")
      .build();
  }
}
