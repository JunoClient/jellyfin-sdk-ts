// NOTE: UserDataApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { UserItemDataDto } from "@jellyfin/sdk/lib/generated-client/models";

export class UserDataApi extends BaseApi {
  /**
   * Marks an item as played for a user.
   *
   * @param itemId      - The unique identifier of the item to mark as
   *                    played.
   * @param userId      - Optional. The user whose played state should be
   *                    updated.
   * @param datePlayed  - Optional. The date and time the item was played.
   * @returns {Promise<UserItemDataDto>} The updated user data for the item.
   */
  public markAsPlayed(itemId: string, userId?: string, datePlayed?: Date) {
    return new RequestBuilder<UserItemDataDto>(this.configuration)
      .withMethod("POST")
      .withEndpoint(`/UserPlayedItems/${itemId}`)
      .withParameters({ userId, datePlayed })
      .build();
  }

  /**
   * Marks an item as unplayed for a user.
   *
   * @param itemId  - The unique identifier of the item to mark as unplayed.
   * @param userId  - Optional. The user whose played state should be
   *                updated.
   * @returns {Promise<UserItemDataDto>} The updated user data for the item.
   */
  public markAsUnplayed(itemId: string, userId?: string) {
    return new RequestBuilder<UserItemDataDto>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint(`/UserPlayedItems/${itemId}`)
      .withParameters({ userId })
      .build();
  }

  /**
   * Marks an item as a favourite for a user.
   *
   * @param itemId  - The unique identifier of the item to mark as a
   *                favourite.
   * @param userId  - Optional. The user whose favourites should be updated.
   * @returns {Promise<UserItemDataDto>} The updated user data for the item.
   */
  public markAsFavourite(itemId: string, userId?: string) {
    return new RequestBuilder<UserItemDataDto>(this.configuration)
      .withMethod("POST")
      .withEndpoint(`/UserFavoriteItems/${itemId}`)
      .withParameters({ userId })
      .build();
  }

  /**
   * Removes an item from a user's favourites.
   *
   * @param itemId  - The unique identifier of the item to remove.
   * @param userId  - Optional. The user whose favourites should be updated.
   * @returns {Promise<UserItemDataDto>} The updated user data for the item.
   */
  public unmarkAsFavourite(itemId: string, userId?: string) {
    return new RequestBuilder<UserItemDataDto>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint(`/UserFavoriteItems/${itemId}`)
      .withParameters({ userId })
      .build();
  }
}
