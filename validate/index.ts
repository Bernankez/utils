// refer to https://github.com/youzan/vant/blob/HEAD/packages/vant/src/utils/validate.ts
export const isDefined = <T>(val: T): val is NonNullable<T> => val !== undefined && val !== null;

export const isFunction = (val: unknown): val is Function => typeof val === "function";

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === "object";

export const isPromise = <T = any>(val: unknown): val is Promise<T> => isObject(val) && isFunction(val.then) && isFunction(val.catch);

export const isDate = (val: unknown): val is Date => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN((val as Date).getTime());

export const isNumeric = (val: string | number): val is string => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);

export const type = (val: any) => {
  return Object.prototype.toString
    .call(val)
    .split(" ")[1]
    .slice(0, -1)
    .replace(/^[a-z]{1}/, p => p.toUpperCase());
};
