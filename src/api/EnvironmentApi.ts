import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type {
  DefaultDirectoryBrowserInfoDto,
  FileSystemEntryInfo,
  ValidatePathDto,
} from "@jellyfin/sdk/lib/generated-client/models";

export class EnvironmentApi extends BaseApi {
  /**
   * Gets the default directory browser.
   *
   * @returns {Promise<DefaultDirectoryBrowserInfoDto>}
   * A promise that resolves to the default directory browser information.
   */
  public getDefaultDirectoryBrowser() {
    return new RequestBuilder<DefaultDirectoryBrowserInfoDto>(
      this.configuration,
    )
      .withEndpoint("/Environment/DefaultDirectoryBrowser")
      .build();
  }

  /**
   * Gets the contents of a directory in the server's file system.
   *
   * @param path                - The directory path.
   * @param includeFiles        - Whether to include files in the results.
   * @param includeDirectories  - Whether to include directories in the
   *                              results.
   * @returns {Promise<FileSystemEntryInfo[]>} A promise that resolves to the
   *                                           directory contents.
   */
  public getDirectoryContents(
    path: string,
    includeFiles?: boolean,
    includeDirectories?: boolean,
  ) {
    return new RequestBuilder<FileSystemEntryInfo[]>(this.configuration)
      .withEndpoint("/Environment/DirectoryContents")
      .withParameters({ path, includeFiles, includeDirectories })
      .build();
  }

  /**
   * Gets the available drives from the server's file system.
   *
   * @returns {Promise<FileSystemEntryInfo[]>} A promise that resolves to the
   *                                           available drives.
   */
  public getDrives() {
    return new RequestBuilder<FileSystemEntryInfo[]>(this.configuration)
      .withEndpoint("/Environment/Drives")
      .build();
  }

  /**
   * Gets the parent path of a given path.
   *
   * @param path  - The path whose parent path should be returned.
   * @returns {Promise<string>} A promise that resolves to the parent path.
   */
  public getParentPath(path: string) {
    return new RequestBuilder<string>(this.configuration)
      .withEndpoint("/Environment/ParentPath")
      .withParameters({ path })
      .build();
  }

  /**
   * Validates a path.
   *
   * @param validatePathDto  - The path validation request.
   * @returns {Promise<void>} A promise that resolves when the path is
   *                          validated.
   */
  public validatePath(validatePathDto: ValidatePathDto) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Environment/ValidatePath")
      .withBody(validatePathDto)
      .build();
  }
}
