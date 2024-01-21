/* eslint-disable prefer-promise-reject-errors */
import { describe, expect, it } from "vitest";
import { awaitPromise } from ".";

describe("awaitPromise", () => {
  it("resolve with array destructuring", async () => {
    const [data] = await awaitPromise(Promise.resolve(1));

    expect(data).toBe(1);
  });

  it("resolve with object destructuring", async () => {
    const { data } = await awaitPromise(Promise.resolve(1));

    expect(data).toBe(1);
  });

  it("reject with array destructuring", async () => {
    const [, error] = await awaitPromise(Promise.reject(1));

    expect(error).toBe(1);
  });

  it("reject with object destructuring", async () => {
    const { error } = await awaitPromise(Promise.reject(1));

    expect(error).toBe(1);
  });
});
