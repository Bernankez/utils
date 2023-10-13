const prefix = "@bernankez/utils";

function _log(str = "", method = "log") {
  // @ts-expect-error console methods
  console[method](prefix + str);
}

const logCopy = _log as typeof _log & Record<Exclude<keyof Console, "Console">, (str?: string) => void>;

export const log = new Proxy(logCopy, {
  get(target, p, receiver) {
    if (typeof p === "string" && p in console && !(p in _log)) {
      return (...args: string[]) => {
        _log(args[0], p);
      };
    }
    return (...args: string[]) => {
      _log(args[0]);
    };
  },
});

