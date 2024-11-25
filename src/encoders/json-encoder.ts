import type { WSFlexEncoder } from "../types.js";

export class JSONEncoder<T> implements WSFlexEncoder<T> {
  encode(data: T): string {
    return JSON.stringify(data);
  }

  decode(encoded: string): T {
    return JSON.parse(encoded);
  }
}
