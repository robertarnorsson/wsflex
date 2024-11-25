import type { WSFlexEncoder } from './types.js';
import { JSONEncoder } from './encoders/json-encoder.js';

export class WSFlex<T = unknown> {
  private encoder: WSFlexEncoder<T>;

  constructor(encoder: WSFlexEncoder<T> = new JSONEncoder<T>()) {
    this.encoder = encoder;
  }

  setEncoder(encoder: WSFlexEncoder<T>): void {
    this.encoder = encoder;
  }

  encode(type: string, data: T): string {
    // Validate the type
    if (!type || typeof type !== 'string' || type.trim() === '') {
      throw new Error('Message type must be a non-empty string.');
    }
  
    const encodedData = this.encoder.encode(data);
  
    const metadata: { type: string; length: number; keys?: number } = {
      type,
      length: encodedData.length,
    };
  
    // Add keys to metadata if data is an object
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      metadata.keys = Object.keys(data).length;
    }
  
    return JSON.stringify({
      metadata,
      payload: encodedData,
    });
  }

  decode(encoded: string, noMetadata: true): T;
  decode(
    encoded: string,
    noMetadata?: false
  ): { metadata: { type: string; length: number; keys?: number }; data: T };

  decode(
    encoded: string,
    noMetadata: boolean = false
  ): T | { metadata: { type: string; length: number; keys?: number }; data: T } {
    try {
      const parsed = JSON.parse(encoded);
  
      // Validate metadata
      if (!parsed.metadata || typeof parsed.metadata !== 'object') {
        throw new Error('Invalid message format: metadata is missing or invalid.');
      }
  
      // Validate payload
      if (!parsed.payload || typeof parsed.payload !== 'string') {
        throw new Error('Invalid message format: payload is missing or invalid.');
      }
  
      const data = this.encoder.decode(parsed.payload);
  
      if (noMetadata) {
        return data;
      }
  
      return {
        metadata: parsed.metadata,
        data,
      };
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('Failed to parse message');
      }
      throw err;
    }
  }  
}
