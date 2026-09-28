// NOTE: MediaInfoApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type {
  PlaybackInfoDto,
  PlaybackInfoResponse,
} from "@jellyfin/sdk/lib/generated-client/models";

export class MediaInfoApi extends BaseApi {
  /**
   * Gets playback information for a specific item via GET.
   *
   * A simpler version of playback info retrieval, used to get stream sources
   * and metadata for an item. Use this for basic playback scenarios where
   * detailed device capability negotiation isn't required.
   *
   * @param itemId - The ID of the item to play.
   * @param userId - Optional. The ID of the user requesting playback.
   * @returns {Promise<PlaybackInfoResponse>} Information regarding available
   *   media streams and playback configuration.
   */
  public getPlaybackInfo(itemId: string, userId?: string) {
    let parameters = userId === undefined ? {} : { userId };

    return new RequestBuilder<PlaybackInfoResponse>(this.configuration)
      .withEndpoint(`/Items/${itemId}/PlaybackInfo`)
      .withParameters(parameters)
      .build();
  }

  /**
   * Gets detailed playback information for an item via POST.
   *
   * This is the preferred method for modern clients. By sending the device's
   * capabilities (supported codecs, bitrates, containers) in the request body,
   * the server can decide if the item requires transcoding.
   *
   * @param itemId - The ID of the item to play.
   * @param parameters - The device profile and playback constraints.
   * @returns {Promise<PlaybackInfoResponse>} The negotiated playback sources,
   *   including TranscodingUrl or DirectStreamUrl.
   */
  public getPostedPlaybackInfo(itemId: string, parameters?: PlaybackInfoDto) {
    return new RequestBuilder<PlaybackInfoResponse>(this.configuration)
      .withMethod("POST")
      .withEndpoint(`/Items/${itemId}/PlaybackInfo`)
      .withBody(parameters)
      .build();
  }
}
