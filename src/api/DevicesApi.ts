// NOTE: DevicesApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type { DeviceInfoDto } from "@jellyfin/sdk/lib/generated-client/models";
import type { ItemsResponse } from "../models/Shared";

export class DevicesApi extends BaseApi {
  /**
   * Retrieves a list of devices registered to the server
   *
   * This method fetches device information and can be filtered by a specific
   * user ID to see devices associated with that account.
   *
   * @param userId  Optional identifier to filter devices by user.
   * @returns {Promise<any>} A promise that resolves to the device data.
   */
  public getDevices(userId?: string) {
    return new RequestBuilder<ItemsResponse<DeviceInfoDto>>(this.configuration)
      .withEndpoint("/Devices")
      .withParameters({ userId })
      .build();
  }

  /**
   * Deletes the specified devices from the server.
   *
   * @param ids Identifiers of the devices to delete.
   * @returns A request builder for the delete operation.
   */
  public deleteDevices(ids: string[]) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint("/Devices")
      .withParameters({ id: ids })
      .build();
  }
}
