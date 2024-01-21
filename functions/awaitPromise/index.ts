import type { Awaitable } from "@bernankez/utils";
import { makeDestructurable } from "@bernankez/utils";

export function awaitPromise<T extends Awaitable<any>, E = any>(promise: Promise<T>) {
  return Promise.resolve(promise)
    .then(data =>
      makeDestructurable(
        { data, error: null } as { data: T; error: null },
        [data, null] as [T, null]),
    )
    .catch(error => makeDestructurable(
      { data: null, error } as { data: null; error: E },
      [null, error] as [null, E]),
    );
}
