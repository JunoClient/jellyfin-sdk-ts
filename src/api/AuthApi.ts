// NOTE: AuthApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { AuthenticationInfo } from "@jellyfin/sdk/lib/generated-client/models";

import type { ItemsResponse } from "../models/Shared";

export class AuthApi extends BaseApi {
  /**
   * Gets all API keys registered with the server.
   *
   * @returns {Promise<ItemsResponse<AuthenticationInfo>>}
   * A paginated list of authentication information for the registered API keys.
   */
  public getAllKeys() {
    return new RequestBuilder<ItemsResponse<AuthenticationInfo>>(
      this.configuration,
    )
      .withEndpoint("/Auth/Keys")
      .build();
  }

  /**
   * Creates a new API key for an application.
   *
   * @param app  - The name of the application requesting the API key.
   * @returns {Promise<void>} A promise that resolves when the API key is
   *                          created.
   */
  public createNewKey(app: string) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Auth/Keys")
      .withParameters({ app })
      .build();
  }

  /**
   * Deletes an API key from the server.
   *
   * @param key  - The API key to delete.
   * @returns {Promise<void>} A promise that resolves when the API key is
   *                          deleted.
   */
  public deleteKey(key: string) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint(`/Auth/Keys/${key}`)
      .build();
  }
}
