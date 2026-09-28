// NOTE: ImageApi is incomplete

import type { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import type { ImageRequestParameters } from "@jellyfin/sdk/lib/models/api/image-request-parameters";

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

export class ImageApi extends BaseApi {
  /**
   * Fetch a user's primary image.
   *
   * @param userId      - The ID of the user.
   * @param parameters  - Optional scaling and formatting parameters (e.g.,
   *                    width, height, quality).
   * @returns {Promise<Blob>} A promise that resolves to the user's profile
   *                          image.
   */
  public getUserImage(userId: string, parameters?: ImageRequestParameters) {
    return new RequestBuilder<Blob>(this.configuration)
      .withEndpoint(`/Users/${userId}/Images/Primary`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Fetch an item's image based on the specified type.
   *
   * @param itemId      - The ID of the item (Movie, Series, Episode, etc.).
   * @param imageType   - The type of image to retrieve (e.g., 'Primary',
   *                    'Backdrop', 'Logo', 'Thumb').
   * @param parameters  - Optional scaling and formatting parameters.
   * @returns {Promise<Blob>} A promise that resolves to the item's image.
   */
  public getItemImage(
    itemId: string,
    imageType: ImageType,
    parameters?: ImageRequestParameters,
  ) {
    return new RequestBuilder<Blob>(this.configuration)
      .withEndpoint(`/Items/${itemId}/Images/${imageType}`)
      .withParameters(parameters)
      .build();
  }
}
