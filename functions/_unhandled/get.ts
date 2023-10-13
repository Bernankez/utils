import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { isIDNumber } from ".";

dayjs.extend(isSameOrAfter);
dayjs.extend(isLeapYear);

export type IDInfo =
  | {
    valid: false;
    sex?: "male" | "female";
    /** eg. 2023-02-14 */
    birthday?: `${string}-${string}-${string}`;
    age?: number;
  }
  | {
    valid: true;
    sex: "male" | "female";
    /** eg. 2023-02-14 */
    birthday: `${string}-${string}-${string}`;
    age: number;
  };

export function getInfoByIDNumber(idNumber: string): IDInfo {
  const valid = isIDNumber(idNumber);
  if (!valid) {
    return {
      valid: false,
    };
  }
  if (idNumber.length === 15) {
    idNumber = idNumber.replace(
      /(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})/,
      "$119$2$3$4$5X",
    );
  }
  const birthday: `${string}-${string}-${string}` = `${idNumber.slice(6, 10)}-${idNumber.slice(10, 12)}-${idNumber.slice(12, 14)}`;
  const sex = parseInt(idNumber[idNumber.length - 2]) % 2 === 0 ? "female" : "male";
  const age = getYearDiff(birthday)!;

  return {
    valid: true,
    birthday,
    sex,
    age,
  };
}

export function getYearDiff(before: string, after = dayjs().format("YYYY-MM-DD")) {
  const beforeYear = dayjs(before);
  const afterYear = dayjs(after);
  if (!before || !after) {
    return undefined;
  }
  let diff = afterYear.diff(beforeYear, "year");
  const beforeDate = beforeYear.format("MM-DD");
  const afterDate = afterYear.format("MM-DD");
  if (diff > 0 && beforeDate === "02-29" && afterDate === "02-28" && !afterYear.isLeapYear()) {
    diff--;
  } else if (diff < 0 && afterDate === "02-29" && beforeDate === "02-28" && !beforeYear.isLeapYear()) {
    diff++;
  }
  return diff;
}

export type Platform = "AIX" | "Darwin" | "FreeBSD" | "Android" | "Linux" | "OpenBSD" | "SunOS" | "Win32" | "unknown";
/**
 * * `AIX` - IBM AIX platform
 * * `Darwin` - Darwin platform (MacOS, IOS etc)
 * * `FreeBSD` - FreeBSD platform
 * * `Android` - Android platform
 * * `Linux` - Linux platform
 * * `OpenBSD` - OpenBSD platform
 * * `SunOS` - SunOS platform
 * * `Win32` - Windows platform
 * * `unknown` - unknown platform
 */
export function getPlatform() {
  switch (process.platform) {
    case "aix":
      return "AIX";
    case "darwin":
      return "Darwin";
    case "freebsd":
      return "FreeBSD";
    case "android":
      return "Android";
    case "linux":
      return "Linux";
    case "openbsd":
      return "OpenBSD";
    case "sunos":
      return "SunOS";
    case "win32":
      return "Win32";
    default:
      return "unknown";
  }
}
