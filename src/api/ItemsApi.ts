// NOTE: ItemsApi, UserLibraryApi is incomplete

import type { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import type {
  LibraryApiGetItemsRequest,
  LibraryApiGetLatestMediaRequest,
  LibraryApiGetRootFolderRequest,
} from "@jellyfin/sdk/lib/generated-client/api/library-api";

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { ItemsResponse } from "../models/Shared";

// NOTE: This incorporates ItemsApi and UserLibraryApi
export class ItemsApi extends BaseApi {
  /**
   * Gets a filtered list of items from the library.
   *
   * This is the primary search/query endpoint for movies, series, and more.
   *
   * @param parameters - Query filters such as IncludeItemTypes, Genres, or
   *   ParentId.
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A paginated list of items.
   */
  public getItems(parameters?: LibraryApiGetItemsRequest) {
    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint("/Items")
      .withParameters(parameters ?? {})
      .build();
  }

  /**
   * Gets metadata for a specific item by ID.
   *
   * @param itemId - The unique identifier of the item.
   * @param userId - Optional. Providing this returns user-specific data like
   *   PlayCount.
   * @returns {Promise<BaseItemDto>} Detailed metadata for the item.
   */
  public getItem(itemId: string, userId?: string) {
    let parameters = userId === undefined ? { itemId } : { userId, itemId };

    return new RequestBuilder<BaseItemDto>(this.configuration)
      .withEndpoint(`/Items/${itemId}`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Gets "Intros" (e.g., pre-roll videos or Cinema Mode clips) for an item.
   *
   * @param itemId - The ID of the item being played.
   * @param userId - Optional. The user ID for permission checks.
   * @returns {Promise<ItemsResponse<BaseItemDto>>} A list of intro clips.
   */
  public getItemIntros(itemId: string, userId?: string) {
    let parameters = userId === undefined ? { itemId } : { userId, itemId };

    return new RequestBuilder<ItemsResponse<BaseItemDto>>(this.configuration)
      .withEndpoint(`/Items/${itemId}/Intros`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Gets local trailer videos associated with an item.
   *
   * @param itemId - The ID of the movie or series.
   * @param userId - Optional. The user ID for permission checks.
   * @returns {Promise<BaseItemDto[]>} A list of trailer items.
   */
  public getItemLocalTrailers(itemId: string, userId?: string) {
    let parameters = userId === undefined ? { itemId } : { userId, itemId };

    return new RequestBuilder<BaseItemDto[]>(this.configuration)
      .withEndpoint(`/Items/${itemId}/LocalTrailers`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Gets special features (deleted scenes, featurettes) for an item.
   *
   * @param itemId - The ID of the movie or series.
   * @param userId - Optional. The user ID for permission checks.
   * @returns {Promise<BaseItemDto[]>} A list of special feature items.
   */
  public getItemSpecialFeatures(itemId: string, userId?: string) {
    let parameters = userId === undefined ? { itemId } : { userId, itemId };

    return new RequestBuilder<BaseItemDto[]>(this.configuration)
      .withEndpoint(`/Items/${itemId}/SpecialFeatures`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Gets the most recently added media items.
   *
   * @param parameters - Filters such as Limit, Fields, and specific ParentId.
   * @returns {Promise<BaseItemDto[]>} A list of the latest media.
   */
  public getLatestMedia(parameters?: LibraryApiGetLatestMediaRequest) {
    return new RequestBuilder<BaseItemDto[]>(this.configuration)
      .withEndpoint(`/Items/Latest`)
      .withParameters(parameters ?? {})
      .build();
  }

  /**
   * Gets the root folder for a specific user.
   *
   * Use this to retrieve the top-level "My Media" views (Movies, TV Shows,
   * etc.).
   *
   * @param parameters - Includes the required UserId.
   * @returns {Promise<BaseItemDto>} The root folder object.
   */
  public getItemRoot(parameters: LibraryApiGetRootFolderRequest) {
    return new RequestBuilder<BaseItemDto>(this.configuration)
      .withEndpoint(`/Items/Root`)
      .withParameters(parameters)
      .build();
  }
}
