import { log } from "./log";

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) { log.warn(...infos); }
};
