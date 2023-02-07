import type { SignaleOptions } from "signale";
import signale from "signale";

const { Signale } = signale;

export function createConsole(header = "") {
  const options: SignaleOptions = {
    types: {
      success: {
        badge: "✔",
        color: "green",
        label: `${header}success`,
      },
      error: {
        badge: "✖",
        color: "red",
        label: `${header}error`,
      },
      warn: {
        badge: "⚠",
        color: "yellow",
        label: `${header}warn`,
      },
    },
  };

  return new Signale(options);
}

export const { success, error, warn } = createConsole("@bernankez/utils ");
