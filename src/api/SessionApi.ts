// NOTE: SessionApi is incomplete

import { RequestBuilder } from "../RequestBuilder";
import { BaseApi } from "./BaseApi";

export class SessionApi extends BaseApi {
  /**
   * Reports that the current session has ended. This endpoint is used to log
   * out the current user and invalidate the active authentication token on the
   * server.
   *
   * @returns {Promise<void>} A promise that resolves when the logout request is
   *   successfully processed.
   */
  public reportSessionEnded() {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Sessions/Logout")
      .build();
  }
}
