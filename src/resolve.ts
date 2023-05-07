import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * resolve __filename and __dirname in esm
 * @param url import.meta.url
 */
export function resolvePath(url: string) {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return { __filename, __dirname };
}
