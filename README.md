# @junoclient/jellyfin-sdk-ts

A lightweight, promise-based TypeScript client for the Jellyfin API.

## Install

```sh
npm install @junoclient/jellyfin-sdk-ts
```

## Usage

```ts
import { JellyfinClient } from "@junoclient/jellyfin-sdk-ts";

const client = new JellyfinClient(
  "https://jellyfin.example.com",
  { name: "My App", version: "1.0.0" },
  { id: "device-id", name: "My Browser" },
);

const systemInfo = await client.System.getPublicSystemInfo();
const authentication = await client.authenticateUserByName("user", "password");
```
