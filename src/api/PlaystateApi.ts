// NOTE: PlaystateApi is incomplete

import type {
  PlaybackProgressInfo,
  PlaybackStartInfo,
  PlaybackStopInfo,
} from "@jellyfin/sdk/lib/generated-client/models";

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

export class PlaystateApi extends BaseApi {
  /**
   * Reports that a playback session has started. Notifies the server that the
   * user has begun playing an item, allowing it to appear in the "Now Playing"
   * section.
   *
   * @param parameters  - The playback start configuration and item metadata.
   * @returns {Promise<void>}
   */
  public reportPlaybackSessionStart(parameters: PlaybackStartInfo) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Sessions/Playing")
      .withBody(parameters)
      .build();
  }

  /**
   * Pings the server to keep a playback session active. Should be called
   * periodically during playback to prevent the session from timing out or
   * being marked as idle.
   *
   * @param playSessionId  - The unique identifier for the current play
   *                       session.
   * @returns {Promise<void>}
   */
  public pingPlaybackSession(playSessionId: string) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Sessions/Playing/Ping")
      .withParameters({ playSessionId })
      .build();
  }

  /**
   * Reports the current progress of a playback session. Updates the server with
   * the current timestamp (PositionTicks) to ensure "Resume" functionality
   * works across different devices.
   *
   * @param parameters  - The current playstate progress.
   * @returns {Promise<void>}
   */
  public reportPlaybackSessionProgress(parameters: PlaybackProgressInfo) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Sessions/Playing/Progress")
      .withBody(parameters)
      .build();
  }

  /**
   * Reports that a playback session has stopped. Finalizes the session and
   * allows the server to update the "Played" status or "Continue Watching"
   * position.
   *
   * @param parameters  - The final playback state and termination reason.
   * @returns {Promise<void>}
   */
  public reportPlaybackSessionStopped(parameters: PlaybackStopInfo) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Sessions/Playing/Stopped")
      .withBody(parameters)
      .withKeepalive()
      .build();
  }
}
