// NOTE: TVShowsApi is incomplete

import type { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import type {
  ShowApiGetEpisodesRequest,
  ShowApiGetNextUpRequest,
  ShowApiGetSeasonsRequest,
  ShowApiGetUpcomingEpisodesRequest,
} from "@jellyfin/sdk/lib/generated-client/api/show-api";

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { ItemsResponse } from "../models/Shared";

export class TVShowsApi extends BaseApi {
  /**
   * Gets all episodes for a specific series.
   *
   * @param seriesId The ID of the series.
   * @param parameters Optional query parameters.
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A list of episodes.
   */
  public getEpisodes(
    seriesId: string,
    parameters?: ShowApiGetEpisodesRequest,
  ) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Shows/${seriesId}/Episodes`)
      .withParameters(parameters ?? {})
      .build();
  }

  /**
   * Gets all seasons for a specific series.
   *
   * @param seriesId The ID of the series.
   * @param parameters Optional query parameters.
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A list of seasons.
   */
  public getSeasons(
    seriesId: string,
    parameters?: ShowApiGetSeasonsRequest,
  ) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Shows/${seriesId}/Seasons`)
      .withParameters(parameters ?? {})
      .build();
  }

  /**
   * Gets the "Next Up" episodes for the current user.
   *
   * @param parameters Optional query parameters (e.g., UserId, Limit).
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A list of next-up episodes.
   */
  public getNextUp(parameters?: ShowApiGetNextUpRequest) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Shows/NextUp`)
      .withParameters(parameters ?? {})
      .build();
  }

  /**
   * Gets a list of upcoming episodes for the current user.
   *
   * @param parameters Optional query parameters.
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A list of upcoming episodes.
   */
  public getUpcoming(parameters?: ShowApiGetUpcomingEpisodesRequest) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Shows/Upcoming`)
      .withParameters(parameters ?? {})
      .build();
  }
}
