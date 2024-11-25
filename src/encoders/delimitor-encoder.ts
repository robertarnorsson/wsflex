import type { WSFlexEncoder } from '../types.js';

export class DelimiterEncoder<T extends Record<string, unknown>> implements WSFlexEncoder<T> {
  private delimiter: string;

  constructor(delimiter = '|') {
    this.delimiter = delimiter;
  }

  encode(data: T): string {
    return Object.entries(data)
      .map(([key, value]) => `${key}:${value}`)
      .join(this.delimiter);
  }

  decode(encoded: string): T {
    const data: Record<string, unknown> = {};
    encoded.split(this.delimiter).forEach((pair) => {
      const [key, value] = pair.split(':');
      if (!key) return;
      data[key] = value;
    });
    return data as T;
  }
}
