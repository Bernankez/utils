import type { Prettier } from "../Prettier";

export type RequiredSome<T, K extends keyof T> = Prettier<Omit<T, K> & Required<Pick<T, K>>>;
