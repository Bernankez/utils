export const isDefined = <T = any>(val: T): val is NonNullable<T> => val !== undefined && val !== null;

export const isClient = typeof window !== "undefined";

const toString = Object.prototype.toString;
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
export const isFunction = <T extends Function>(val: any): val is T => typeof val === "function";
export const isNumber = (val: any): val is number => typeof val === "number";
export const isString = (val: unknown): val is string => typeof val === "string";
export const isObject = (val: any): val is object =>
  toString.call(val) === "[object Object]";
export const isWindow = (val: any): val is Window => typeof window !== "undefined" && toString.call(val) === "[object Window]";

export const isIOS = /* #__PURE__ */ isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
