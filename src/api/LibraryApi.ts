// NOTE: LibraryApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { ItemsResponse } from "../models/Shared";

import type { LibraryApiGetSimilarItemsRequest } from "@jellyfin/sdk/lib/generated-client/api/library-api";
import type { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";

export class LibraryApi extends BaseApi {
  /**
   * Gets items similar to a specific library item.
   *
   * Use this to retrieve recommendations based on a specific movie, series, or
   * artist. The similarity is determined by the server's internal ranking logic
   * (genres, directors, etc.).
   *
   * @param itemId
   * - The unique ID of the item to find similarities for.
   * @param parameters
   * - Optional constraints like Limit, Fields, and UserId.
   * @returns {Promise<ItemsResponse<BaseItemDto>>}
   * A list of similar items.
   */
  public getSimilarItems(
    itemId: string,
    parameters: LibraryApiGetSimilarItemsRequest,
  ) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Items/${itemId}/Similar`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Starts a scan of the library to refresh its contents.
   *
   * @returns {Promise<void>} A request that completes when the scan has been
   *                          started.
   */
  public startLibraryScan() {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Library/Refresh")
      .build();
  }
}
