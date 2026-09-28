// NOTE: LibraryStructureApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { VirtualFolderInfo } from "@jellyfin/sdk/lib/generated-client/models";

export class LibraryStructureApi extends BaseApi {
  /**
   * Gets the virtual folders configured on the server.
   *
   * @returns {Promise<VirtualFolderInfo[]>}
   * A promise that resolves to the virtual folders.
   */
  public getVirtualFolders() {
    return new RequestBuilder<VirtualFolderInfo[]>(this.configuration)
      .withEndpoint(`/Library/VirtualFolders`)
      .build();
  }
}
