import * as core from "./core.js";

export function parse(value) {
  return { value: String(value), size: Object.keys(core).length };
}

export { core };
