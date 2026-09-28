/** An HTTP error returned by the Jellyfin API. */
export class JellyfinApiError extends Error {
  constructor(
    readonly status: number,
    readonly statusText: string,
    readonly body: string,
  ) {
    super(body || statusText || `Request failed with status: ${status}`);
    this.name = "JellyfinApiError";
  }
}
