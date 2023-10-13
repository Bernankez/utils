import { assert, isDefined, isNumber } from ".";

const isTuple = (arr: any[]): arr is [number] | [number, number] => {
  if (arr.length > 0) {
    if (isNumber(arr[0])) {
      return true;
    }
    return false;
  }
  return true;
};

export function masking(
  character: string,
  range: [number, number] | [number] | ([number, number] | [number])[],
  maskCode = "*",
) {
  if (!isDefined(character)) {
    return character;
  }
  let val = character;
  let _range: [number, number][] = [];
  if (Array.isArray(range)) {
    assert(Array.isArray(range), "range is not iterable");
    if (isTuple(range)) {
      const [start = 0, end = character.length] = range;
      _range.push([start, end]);
    } else {
      _range = range.map((r) => {
        const [start = 0, end = character.length] = r;
        return [start, end];
      });
    }
    _range.forEach((r) => {
      val = val.slice(0, r[0]) + "".padStart(val.slice(r[0], r[1]).length, maskCode) + val.slice(r[1]);
    });
  }
  return val;
}
