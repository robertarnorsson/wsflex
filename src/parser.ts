import { WSFlexMessage, WSFlexMessageData } from './types';

export class WSFlex {
  // Encode a message into a WSFlexMessage instance
  static encode<T extends WSFlexMessageData>(type: string, data: T): WSFlexMessage<T> {
    if (!type || typeof type !== 'string') {
      throw new Error('Message type must be a non-empty string.');
    }
    return new WSFlexMessage<T>(type, data);
  }

  // Decode a JSON string into a WSFlexMessage instance
  static decode<T extends WSFlexMessageData>(rawMessage: string): WSFlexMessage<T> {
    try {
      const parsed = JSON.parse(rawMessage);

      if (!parsed.type || typeof parsed.type !== 'string') {
        throw new Error('Invalid message format: "type" is missing or invalid.');
      }

      if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
        throw new Error('Invalid message format: "data" must be a plain object.');
      }

      return new WSFlexMessage<T>(parsed.type, parsed.data);
    } catch (err) {
      throw new Error('Failed to parse message: ' + (err as Error).message);
    }
  }
}
