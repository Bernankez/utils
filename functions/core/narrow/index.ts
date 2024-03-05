type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export function narrow<T>(t: Narrow<T>): T {
  return t as T;
}

type Narrow<T> = T extends [] ? [] : {
  [K in keyof T]: T[K] extends Primitive ? T[K] : Narrow<T[K]>
};

export const n = narrow;
