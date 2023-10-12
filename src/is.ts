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

export const isIOS = isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);

const provinces = ["11", "12", "13", "14", "15", "21", "22", "23", "31", "32", "33", "34", "35", "36", "37", "41", "42", "43", "44", "45", "46", "50", "51", "52", "53", "54", "61", "62", "63", "64", "65", "71", "81", "82", "91"];
export const isIDNumber = (idNumber: string) => {
  const digit18Reg
    = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
  const digit15Reg = /^\d{6}\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/i;
  if (!idNumber || !(digit18Reg.test(idNumber) || digit15Reg.test(idNumber))) {
    // format error
    return false;
  }
  if (!provinces.includes(idNumber.slice(0, 2))) {
    // wrong address code
    return false;
  }
  if (idNumber.length === 18) {
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i++) {
      ai = parseInt(idNumber[i]);
      wi = factor[i];
      sum += ai * wi;
    }
    const last = parity[sum % 11].toString();
    if (last !== idNumber[17]) {
      // wrong check code
      return false;
    }
  }
  return true;
};
