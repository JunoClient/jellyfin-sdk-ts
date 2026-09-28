export const RefreshStatus = {
  Idle: "Idle",
  Active: "Active",
  Cancelling: "Cancelling",
} as const;

export type RefreshStatus = (typeof RefreshStatus)[keyof typeof RefreshStatus];
