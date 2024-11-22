export interface WSFlexMessageData {
  [key: string]: unknown;
}

export interface WSFlexMessageFormat<T extends WSFlexMessageData> {
  type: string;
  data: T;
}

export class WSFlexMessage<T extends WSFlexMessageData> {
  constructor(public type: string, public data: T) {}

  // Convert the message to a string format
  toString(): string {
    return JSON.stringify({ type: this.type, data: this.data });
  }

  // Return the raw JSON object
  toJson(): WSFlexMessageFormat<T> {
    return { type: this.type, data: this.data };
  }
}
