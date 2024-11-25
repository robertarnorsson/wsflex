export interface WSFlexMessageData {
  [key: string]: unknown;
}

export interface WSFlexMessageFormat<T extends WSFlexMessageData> {
  type: string;
  data: T;
}

export interface WSFlexEncoder<T = Record<string, unknown>> {
  encode(data: T): string;
  decode(encoded: string): T;
}

export class WSFlexEncodedMessage {
  // Public readonly properties
  public readonly metadata: { type: string; length: number; keys?: number };
  public readonly payload: string;

  constructor(metadata: { type: string; length: number; keys?: number }, payload: string) {
    this.metadata = metadata;
    this.payload = payload;
  }

  // Returns the entire encoded message as a string
  toString(): string {
    return JSON.stringify({
      metadata: this.metadata,
      payload: this.payload,
    });
  }
}
