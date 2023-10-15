import { log } from "@/_internal";

export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => Object.prototype.hasOwnProperty.call(val, key);

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) { log.warn(...infos); }
};
