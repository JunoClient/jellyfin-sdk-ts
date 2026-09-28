// NOTE: BrandingApi is incomplete

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

import type {
  BrandingOptionsDto,
  ImageFormat,
} from "@jellyfin/sdk/lib/generated-client/models";

import { fromByteArray } from "base64-js";

export class BrandingApi extends BaseApi {
  /**
   * Gets the branding configuration.
   *
   * @returns {Promise<BrandingOptionsDto>}
   * A promise that resolves to the branding configuration.
   */
  public getBrandingConfiguration() {
    return new RequestBuilder<BrandingOptionsDto>(this.configuration)
      .withEndpoint("/Branding/Configuration")
      .build();
  }

  /**
   * Updates the branding configuration.
   *
   * @param brandingConfiguration  - The branding configuration to apply.
   * @returns {Promise<void>} A promise that resolves when the branding
   *                          configuration is updated.
   */
  public setBrandingConfiguration(brandingConfiguration: BrandingOptionsDto) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/System/Configuration/Branding")
      .withBody(brandingConfiguration)
      .build();
  }

  /**
   * Gets the splashscreen image.
   *
   * @param parameters         - Optional cache validation and formatting
   *                           parameters.
   * @param parameters.tag     - The image tag used for cache validation.
   * @param parameters.format  - The requested image format.
   * @returns {Promise<Blob>} A promise that resolves to the splashscreen
   *                          image.
   */
  public getSplashscreen(
    parameters: { tag?: string; format?: ImageFormat } = {},
  ) {
    return new RequestBuilder<Blob>(this.configuration)
      .withEndpoint("/Branding/Splashscreen")
      .withParameters(parameters)
      .build();
  }

  /**
   * Uploads a custom splashscreen image.
   *
   * @param image  - The splashscreen image to upload.
   * @returns {Promise<void>} A promise that resolves when the custom
   *                          splashscreen image is uploaded.
   */
  public async uploadCustomSplashscreen(image: Blob) {
    const bytes = await image.bytes();
    const base64 = fromByteArray(bytes);

    await new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Branding/Splashscreen")
      .withHeaders({ "Content-Type": image.type })
      .withBody(base64)
      .build();
  }

  /**
   * Deletes the custom splashscreen image.
   *
   * @returns {Promise<void>} A promise that resolves when the custom
   *                          splashscreen image is deleted.
   */
  public deleteCustomSplashscreen() {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint("/Branding/Splashscreen")
      .build();
  }
}
