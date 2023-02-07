import { warn } from "./_console";

export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => Object.prototype.hasOwnProperty.call(val, key);

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) { warn(...infos); }
};
