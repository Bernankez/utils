import type { Awaitable } from "@bernankez/utils";
import { makeDestructurable } from "@bernankez/utils";

export function awaitPromise<T extends Awaitable<any>, E = any>(promise: Promise<T>) {
  return Promise.resolve(promise)
    .then(data =>
      makeDestructurable(
        { data, error: null, status: "fulfilled" } as { data: T; error: null; status: "fulfilled" },
        [data, null, "fulfilled"] as [T, null, "fulfilled"]),
    )
    .catch(error => makeDestructurable(
      { data: null, error, status: "rejected" } as { data: null; error: E; status: "rejected" },
      [null, error, "rejected"] as [null, E, "rejected"]),
    );
}
