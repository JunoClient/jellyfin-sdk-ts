import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type {
  BackupManifestDto,
  BackupOptionsDto,
  BackupRestoreRequestDto,
} from "@jellyfin/sdk/lib/generated-client/models";

export class BackupApi extends BaseApi {
  /**
   * Gets a list of all currently present backups in the backup directory.
   *
   * @returns {Promise<BackupManifestDto[]>}
   * A promise that resolves to the available backup manifests.
   */
  public getAllBackups() {
    return new RequestBuilder<BackupManifestDto[]>(this.configuration)
      .withEndpoint("/Backup")
      .build();
  }

  /**
   * Creates a new backup.
   *
   * @param options  - The backup options.
   * @returns {Promise<BackupManifestDto>}
   * A promise that resolves to the created backup manifest.
   */
  public createBackup(options: BackupOptionsDto) {
    return new RequestBuilder<BackupManifestDto>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Backup/Create")
      .withBody(options)
      .build();
  }

  /**
   * Gets the manifest from an existing backup archive.
   *
   * @param path  - The path to the backup archive.
   * @returns {Promise<BackupManifestDto>}
   * A promise that resolves to the backup manifest.
   */
  public getBackup(path: string) {
    return new RequestBuilder<BackupManifestDto>(this.configuration)
      .withEndpoint("/Backup/Manifest")
      .withParameters({ path })
      .build();
  }

  /**
   * Starts restoring a backup by restarting the server and applying it.
   *
   * @param request  - The data used to start the restore process.
   * @returns {Promise<void>}
   * A promise that resolves when the backup restore is started.
   */
  public startRestoreBackup(request: BackupRestoreRequestDto) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Backup/Restore")
      .withBody(request)
      .build();
  }
}
