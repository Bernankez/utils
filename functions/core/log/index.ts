import ac from "ansi-colors";
import { isBrowser } from "..";

export interface Log {
  message: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
  success: (msg: string) => void;
}

const browserLog: Log = {
  message(msg) {
    console.log(`%c>%c ${msg}`, "color: #333333; font-weight: bold;", "");
  },
  info(msg) {
    console.log(`%ci%c ${msg}`, "color: #1E90FF; font-weight: bold;", "");
  },
  warn(msg) {
    console.log(`%c⚠%c ${msg}`, "color: #FFA500; font-weight: bold;", "");
  },
  error(msg) {
    console.log(`%c✖%c ${msg}`, "color: #FF6347; font-weight: bold;", "");
  },
  success(msg) {
    console.log(`%c✔%c ${msg}`, "color: #32CD32; font-weight: bold;", "");
  },
};

const nodeLog: Log = {
  message: (msg: string) => {
    console.log(ac.white("> ") + msg);
  },
  info: (msg: string) => {
    console.log(ac.yellow("i ") + msg);
  },
  warn: (msg: string) => {
    console.log(ac.yellow("⚠ ") + msg);
  },
  error: (msg: string) => {
    console.log(ac.red("✖ ") + msg);
  },
  success: (msg: string) => {
    console.log(ac.green("✔ ") + msg);
  },
};

export const log = isBrowser ? browserLog : nodeLog;
