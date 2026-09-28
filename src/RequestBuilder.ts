import type { ApiConfiguration } from "./models/Shared";
import { JellyfinApiError } from "./JellyfinApiError";

const paramsFromObject = (object: object) => {
  const params = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  });

  return params;
};

const isBodyInit = (body: BodyInit | object): body is BodyInit => {
  return (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    body instanceof ReadableStream
  );
};

/**
 * Utility for constructing and executing HTTP requests to the Jellyfin API.
 *
 * This builder handles:
 *
 * - Appending the base path to endpoints.
 * - Serializing query parameters (including arrays).
 * - Injecting the `Authorization` header.
 * - Serializing JSON bodies while passing native Fetch payloads through.
 */
export class RequestBuilder<T> {
  private configuration: ApiConfiguration;

  private parameters?: object;
  private endpoint?: string;

  private method: string;
  private headers?: Record<string, string>;
  private body?: BodyInit | object;
  private keepalive?: boolean;

  /**
   * Initializes the builder with a default 'GET' method and configuration.
   *
   * @param configuration  - The server path and authentication details.
   */
  constructor(configuration: ApiConfiguration) {
    this.method = "GET";
    this.configuration = configuration;
  }

  /**
   * Overrides or updates the API configuration for this request. Useful for
   * switching user contexts or server base paths mid-chain.
   *
   * @param configuration  - The new API configuration to apply.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withConfiguration(configuration: ApiConfiguration) {
    this.configuration = configuration;
    return this;
  }

  /**
   * Sets the HTTP method for the request (e.g., 'GET', 'POST', 'DELETE').
   *
   * @param method  - The HTTP verb to use. Defaults to 'GET'.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withMethod(method: string) {
    this.method = method;
    return this;
  }

  /**
   * Sets the query parameters to be appended to the request URL. These will be
   * serialized into a query string, supporting both simple values and arrays
   * (as multiple keys).
   *
   * @param parameters  - An object representing the key-value pairs for the
   *                    query.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withParameters(parameters?: object) {
    this.parameters = parameters;
    return this;
  }

  /**
   * Sets the relative API endpoint path.
   *
   * @param endpoint  - The path relative to the base URL (e.g.,
   *                  '/Users/Logout').
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withEndpoint(endpoint?: string) {
    this.endpoint = endpoint;
    return this;
  }

  /**
   * Adds custom HTTP headers to the request.
   *
   * Note: The 'Authorization' header and JSON Content-Type are managed
   * automatically during the .build() step.
   *
   * @param headers  - An object containing custom header key-value pairs.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withHeaders(headers?: Record<string, string>) {
    this.headers = headers;
    return this;
  }

  /**
   * Sets the body for the request.
   *
   * Plain objects are serialized as JSON. Native Fetch payloads, such as Blob,
   * FormData, URLSearchParams, and ArrayBuffer, are sent unchanged.
   *
   * @param body  - The JSON value or native Fetch payload to send.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withBody(body?: BodyInit | object) {
    this.body = body;
    return this;
  }

  /**
   * Sets the keepalive option for the request.
   *
   * @param keepalive  - Optional boolean value indicating whether keepalive
   *                   should be enabled. If `true` or `undefined`, the
   *                   instance will maintain a persistent connection. If
   *                   `false`,
   *                   keepalive will be disabled.
   * @returns {this} The current RequestBuilder instance for chaining.
   */
  public withKeepalive(keepalive?: boolean) {
    this.keepalive = keepalive ?? true;
    return this;
  }

  /**
   * Generates the final URL as a string. Useful for image tags or external
   * playback links.
   *
   * @returns {string} The fully qualified URL with query parameters.
   */
  public url() {
    let url = this.configuration.basePath;

    if (this.endpoint !== undefined) {
      url += this.endpoint;
    }

    if (
      this.parameters !== undefined &&
      Object.keys(this.parameters).length > 0
    ) {
      const searchParameters = paramsFromObject(this.parameters);
      url += "?" + searchParameters.toString();
    }

    return url;
  }

  /**
   * Executes the request using the Fetch API.
   *
   * - Automatically attaches Authorization headers.
   * - Parses response as JSON.
   *
   * @returns {Promise<T>} The parsed JSON response.
   * @throws {JellyfinApiError} If the server returns a non-2xx status code.
   */
  public async build(): Promise<T> {
    const url = this.url();

    const headers = { ...this.headers };

    headers["Authorization"] = this.configuration.authorisationHeader;

    let body: BodyInit | undefined;

    if (this.body !== undefined) {
      if (isBodyInit(this.body)) {
        body = this.body;
      } else {
        body = JSON.stringify(this.body);

        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
      }
    }

    const res = await fetch(url, {
      method: this.method,
      headers,
      body,
      keepalive: this.keepalive,
    });

    // Handle HTTP errors
    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      throw new JellyfinApiError(res.status, res.statusText, errorBody);
    }

    // Handle 204 No Content or 205 Reset Content
    if (
      res.status === 204 ||
      res.status === 205 ||
      res.headers.get("content-length") === "0"
    ) {
      return undefined as unknown as T;
    }

    const contentType = res.headers.get("content-type");

    // Handle plain text
    if (contentType?.includes("text/plain")) {
      return (await res.text()) as T;
    }

    // Handle JSON
    if (contentType?.includes("application/json")) {
      return (await res.json()) as T;
    }

    // Handle response as binary (fallback)
    return (await res.blob()) as T;
  }
}
