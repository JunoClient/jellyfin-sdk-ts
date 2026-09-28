# @junoclient/jellyfin-sdk-ts

A lightweight, promise-based TypeScript client for the Jellyfin API.

## Compatibility

This SDK targets the Jellyfin 12.1 API.

Full compliance has not yet been achieved. Work is ongoing to reach Jellyfin 12.1 compatibility, and the SDK API may change substantially during this development phase. Currently, data models are provided by the official [`@jellyfin/sdk`](https://www.npmjs.com/package/@jellyfin/sdk) package, rather than being independently maintained in this project.

## Install

```sh
npm install @junoclient/jellyfin-sdk-ts
```

## Usage

```ts
import { JellyfinClient } from "@junoclient/jellyfin-sdk-ts";
import type {
  ClientInfo,
  DeviceInfo,
} from "@junoclient/jellyfin-sdk-ts/models";

const clientInfo: ClientInfo = { name: "My App", version: "1.0.0" };
const deviceInfo: DeviceInfo = { id: "device-id", name: "My Browser" };

const client = new JellyfinClient(
  "https://jellyfin.example.com",
  clientInfo,
  deviceInfo,
);

const systemInfo = await client.System.getPublicSystemInfo();
const authentication = await client.authenticateUserByName("user", "password");
```

## Disclaimer

Use this SDK at your own risk. It is provided as-is, without warranty; see the
[ISC License](./LICENSE) for the full terms.
