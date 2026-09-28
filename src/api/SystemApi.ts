// NOTE: SystemApi is incomplete

import { RequestBuilder } from "../RequestBuilder";
import { BaseApi } from "./BaseApi";

import {
  type SystemStorageDto,
  type PublicSystemInfo,
  type SystemInfo,
  type LogFile,
  type ServerConfiguration,
} from "@jellyfin/sdk/lib/generated-client/models";

export class SystemApi extends BaseApi {
  /**
   * Gets detailed information about the system
   *
   * This endpoint provides comprehensive data regarding the server status and
   * versioning.
   *
   * @returns {Promise<SystemInfo>} A promise that resolves to the system
   *                                information.
   */
  public getSystemInfo() {
    return new RequestBuilder<SystemInfo>(this.configuration)
      .withEndpoint("/System/Info")
      .build();
  }

  /**
   * Gets public information about the system
   *
   * This provides a subset of system details accessible to unauthenticated
   * clients.
   *
   * @returns {Promise<PublicSystemInfo>} A promise that resolves to the
   *                                      public system information.
   */
  public getPublicSystemInfo() {
    return new RequestBuilder<PublicSystemInfo>(this.configuration)
      .withEndpoint("/System/Info/Public")
      .build();
  }

  /**
   * Gets storage information for the system
   *
   * Provides details regarding available and used storage space on the server
   * host.
   *
   * @returns {Promise<SystemStorageDto>} A promise that resolves to the
   *                                      system storage information.
   */
  public getStorageInformation() {
    return new RequestBuilder<SystemStorageDto>(this.configuration)
      .withEndpoint("/System/Info/Storage")
      .build();
  }

  /**
   * Restarts the application server
   *
   * This sends a command to the server to initiate a full restart cycle.
   *
   * @returns {Promise<void>} A promise that resolves when the restart command
   *                          is accepted.
   */
  public restartServer() {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/System/Restart")
      .build();
  }

  /**
   * Shuts down the application server
   *
   * This gracefully terminates the server process.
   *
   * @returns {Promise<void>} A promise that resolves when the shutdown
   *                          command is accepted.
   */
  public shutdownServer() {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/System/Shutdown")
      .build();
  }

  /**
   * Gets the server log files
   *
   * Provides a list of available log files from the server.
   *
   * @returns {Promise<LogFile[]>} A promise that resolves to the server log
   *                               files.
   */
  public getServerLogs() {
    return new RequestBuilder<LogFile[]>(this.configuration)
      .withEndpoint("/System/Logs")
      .build();
  }

  /**
   * Gets a server log file
   *
   * Retrieves the contents of a specific log file by name.
   *
   * @param {string} name  The name of the log file to retrieve.
   * @returns {Promise<string>} A promise that resolves to the log file
   *                            contents.
   */
  public getLogFile(name: string) {
    return new RequestBuilder<string>(this.configuration)
      .withEndpoint("/System/Logs/Log")
      .withParameters({ name })
      .build();
  }

  /**
   * Gets the application configuration
   *
   * Retrieves the server configuration settings.
   *
   * @returns {Promise<ServerConfiguration>}
   * A promise that resolves to the server configuration.
   */
  public getApplicationConfiguration() {
    return new RequestBuilder<ServerConfiguration>(this.configuration)
      .withEndpoint("/System/Configuration")
      .build();
  }

  /**
   * Updates the application configuration
   *
   * Saves the provided server configuration settings.
   *
   * @param {ServerConfiguration} updatedConfiguration
   * The updated server configuration.
   * @returns {Promise<void>}
   * A promise that resolves when the configuration is saved.
   */
  public setApplicationConfiguration(
    updatedConfiguration: ServerConfiguration,
  ) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/System/Configuration")
      .withBody(updatedConfiguration)
      .build();
  }

  /**
   * Gets a named application configuration.
   *
   * Retrieves a configuration object identified by its server-defined key.
   * The caller supplies the expected shape of the returned configuration.
   *
   * @param {string} key  The key identifying the configuration to retrieve.
   * @returns {Promise<T>} A promise that resolves to the named configuration.
   * @template T  The shape of the named configuration.
   */
  public getNamedConfiguration<T extends object>(key: string) {
    return new RequestBuilder<T>(this.configuration)
      .withEndpoint(`/System/Configuration/${key}`)
      .build();
  }

  /**
   * Updates a named application configuration.
   *
   * Saves a configuration object under its server-defined key.
   *
   * @param {string} key    The key identifying the configuration to update.
   * @param {T}      value  The updated configuration value.
   * @returns {Promise<void>} A promise that resolves when the configuration
   *                          is saved.
   * @template T  The shape of the named configuration.
   */
  public setNamedConfiguration<T extends object>(key: string, value: T) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint(`/System/Configuration/${key}`)
      .withBody(value)
      .build();
  }
}
