import { AuthApi } from "./api/AuthApi";
import { BackupApi } from "./api/BackupApi";
import { BrandingApi } from "./api/BrandingApi";
import { DevicesApi } from "./api/DevicesApi";
import { EnvironmentApi } from "./api/EnvironmentApi";
import { ImageApi } from "./api/ImageApi";
import { ItemsApi } from "./api/ItemsApi";
import { LibraryApi } from "./api/LibraryApi";
import { LibraryStructureApi } from "./api/LibraryStructureApi";
import { LocalizationApi } from "./api/LocalizationApi";
import { MediaInfoApi } from "./api/MediaInfoApi";
import { PlaystateApi } from "./api/PlaystateApi";
import { SessionApi } from "./api/SessionApi";
import { SystemApi } from "./api/SystemApi";
import { TVShowsApi } from "./api/TVShowsApi";
import { UserApi } from "./api/UserApi";
import { UserDataApi } from "./api/UserDataApi";

import type { ClientInfo, DeviceInfo } from "./models/JellyfinClient";
import type { ApiConfiguration } from "./models/Shared";

/**
 * The main entry point for interacting with the Jellyfin API. This class
 * coordinates authentication, device identification, and provides access to
 * specialized API sub-modules.
 */
export class JellyfinClient {
  private clientInfo: ClientInfo;
  private deviceInfo: DeviceInfo;

  private basePath: string;
  private accessToken: string;

  constructor(
    basePath: string,
    clientInfo: ClientInfo,
    deviceInfo: DeviceInfo,
    accessToken?: string,
  ) {
    this.clientInfo = clientInfo;
    this.deviceInfo = deviceInfo;

    // Remove trailing '/'
    const sanitisedBasePath = (
      basePath.endsWith("/") ? basePath.slice(0, -1) : basePath
    ).trim();

    this.basePath = sanitisedBasePath;
    this.accessToken = accessToken ?? "";
  }

  get Auth() {
    return new AuthApi(this.configuration);
  }

  get Backup() {
    return new BackupApi(this.configuration);
  }

  get Branding() {
    return new BrandingApi(this.configuration);
  }

  get Devices() {
    return new DevicesApi(this.configuration);
  }

  get Environment() {
    return new EnvironmentApi(this.configuration);
  }

  get Image() {
    return new ImageApi(this.configuration);
  }

  get Items() {
    return new ItemsApi(this.configuration);
  }

  get Library() {
    return new LibraryApi(this.configuration);
  }

  get LibraryStructure() {
    return new LibraryStructureApi(this.configuration);
  }

  get Localization() {
    return new LocalizationApi(this.configuration);
  }

  get MediaInfo() {
    return new MediaInfoApi(this.configuration);
  }

  get Playstate() {
    return new PlaystateApi(this.configuration);
  }

  get Session() {
    return new SessionApi(this.configuration);
  }

  get System() {
    return new SystemApi(this.configuration);
  }

  get TVShows() {
    return new TVShowsApi(this.configuration);
  }

  get User() {
    return new UserApi(this.configuration);
  }

  get UserData() {
    return new UserDataApi(this.configuration);
  }

  /**
   * Gets the current authentication token.
   *
   * @returns {string} The active access token or an empty string if not
   *                   authenticated.
   */
  get AccessToken(): string {
    return this.accessToken;
  }

  /**
   * Gets the device information used for this client instance.
   *
   * @returns {DeviceInfo} Details about the device hardware and ID.
   */
  get DeviceInfo(): DeviceInfo {
    return this.deviceInfo;
  }

  /**
   * Gets the client application information.
   *
   * @returns {ClientInfo} The application name and version.
   */
  get ClientInfo(): ClientInfo {
    return this.clientInfo;
  }

  /**
   * Generates the formatted "MediaBrowser" authorization string. This string
   * combines client metadata and the active access token into the format
   * required by the Jellyfin server's security layer.
   *
   * @returns {string} The complete header value (e.g., "MediaBrowser
   *                   Client=...", etc).
   */
  get authorisationHeader(): string {
    return `MediaBrowser Client=${this.clientInfo.name}, Device="${this.deviceInfo.name}", DeviceId="${this.deviceInfo.id}", Version="${this.clientInfo.version}", Token="${this.accessToken}"`;
  }

  /**
   * Returns a snapshot of the current API connection settings. This is passed
   * to child API modules to ensure they use the correct server URL and the most
   * recent authentication token.
   *
   * @returns {ApiConfiguration} An object containing the basePath and auth
   *                             header.
   */
  get configuration(): ApiConfiguration {
    return {
      basePath: this.basePath,
      authorisationHeader: this.authorisationHeader,
    };
  }

  /**
   * Authenticates a user and automatically stores the resulting AccessToken.
   *
   * This updates the client state so that all subsequent API calls are
   * automatically authenticated.
   *
   * @param username
   * - The Jellyfin username.
   * @param password
   * - The user's password.
   * @returns {Promise<AuthenticationResult>}
   * The server's authentication response.
   */
  authenticateUserByName(username: string, password: string) {
    return this.User.authenticateByName(username, password).then((res) => {
      this.accessToken = res?.AccessToken ?? "";
      return res;
    });
  }

  /**
   * Logs out the current user and clears the local AccessToken.
   *
   * This notifies the server to invalidate the session and resets the client to
   * an unauthenticated state.
   *
   * @returns {Promise<void>}
   */
  logout() {
    return this.Session.reportSessionEnded().then(
      () => (this.accessToken = ""),
    );
  }
}
