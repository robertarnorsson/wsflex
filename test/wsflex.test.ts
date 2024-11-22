import { WSFlex } from '../src/parser';
import { WSFlexMessage } from '../src/types';

describe('WSFlex', () => {
  it('encodes a message correctly', () => {
    type ChatMessageData = { id: number; text: string };
    const message = WSFlex.encode<ChatMessageData>('chatMessage', { id: 1, text: 'Hello, world!' });

    expect(message).toBeInstanceOf(WSFlexMessage);
    expect(message.type).toBe('chatMessage');
    expect(message.data).toEqual({ id: 1, text: 'Hello, world!' });
    expect(message.toString()).toBe('{"type":"chatMessage","data":{"id":1,"text":"Hello, world!"}}');
  });

  it('decodes a message correctly', () => {
    type ChatMessageData = { id: number; text: string };
    const rawMessage = '{"type":"chatMessage","data":{"id":1,"text":"Hello, world!"}}';

    const decodedMessage = WSFlex.decode<ChatMessageData>(rawMessage);

    expect(decodedMessage).toBeInstanceOf(WSFlexMessage);
    expect(decodedMessage.type).toBe('chatMessage');
    expect(decodedMessage.data).toEqual({ id: 1, text: 'Hello, world!' });
  });

  it('throws an error when encoding with an invalid type', () => {
    type InvalidMessageData = { key: string };
    expect(() => WSFlex.encode<InvalidMessageData>('', { key: 'value' })).toThrow(
      'Message type must be a non-empty string.'
    );
  });

  it('throws an error when decoding an invalid message', () => {
    const invalidMessage = '{"invalidJson}';
    expect(() => WSFlex.decode(invalidMessage)).toThrow('Failed to parse message');
  });

  it('throws an error when decoding a message with no type', () => {
    const invalidMessage = '{"data":{"key":"value"}}';
    expect(() => WSFlex.decode(invalidMessage)).toThrow(
      'Invalid message format: "type" is missing or invalid.'
    );
  });

  it('throws an error when decoding a message with invalid data', () => {
    const invalidMessage = '{"type":"testMessage","data":[]}';
    expect(() => WSFlex.decode(invalidMessage)).toThrow(
      'Invalid message format: "data" must be a plain object.'
    );
  });
});
