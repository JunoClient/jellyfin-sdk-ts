import type { ApiConfiguration } from "../models/Shared";

/**
 * The base class for all Jellyfin API service implementations.
 *
 * This class stores the shared configuration (base URL, authentication token,
 * device info) required to make authenticated calls to the Jellyfin server.
 */
export abstract class BaseApi {
  /**
   * The configuration object containing server details and credentials.
   *
   * @protected
   */
  protected configuration: ApiConfiguration;

  /**
   * Initializes a new instance of the API service.
   *
   * @param configuration - The shared API configuration.
   */
  constructor(configuration: ApiConfiguration) {
    this.configuration = configuration;
  }
}
