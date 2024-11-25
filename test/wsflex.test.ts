import { WSFlex } from '../src/parser';

describe('WSFlex', () => {
  it('encodes a message correctly', () => {
    type ChatMessageData = { id: number; text: string };
    const wsflex = new WSFlex<ChatMessageData>();
    const encoded = wsflex.encode('chatMessage', { id: 1, text: 'Hello, world!' });

    expect(JSON.parse(encoded)).toEqual({
      metadata: {
        type: 'chatMessage',
        length: 31,
        keys: 2,
      },
      payload: '{"id":1,"text":"Hello, world!"}',
    });
  });

  it('decodes a message correctly with metadata', () => {
    type ChatMessageData = { id: number; text: string };
    const wsflex = new WSFlex<ChatMessageData>();
    const rawMessage =
      '{"metadata":{"type":"chatMessage","length":33,"keys":2},"payload":"{\\"id\\":1,\\"text\\":\\"Hello, world!\\"}"}';

    const decoded = wsflex.decode(rawMessage);

    expect(decoded).toEqual({
      metadata: {
        type: 'chatMessage',
        length: 33,
        keys: 2,
      },
      data: { id: 1, text: 'Hello, world!' },
    });
  });

  it('decodes a message correctly without metadata', () => {
    type ChatMessageData = { id: number; text: string };
    const wsflex = new WSFlex<ChatMessageData>();
    const rawMessage =
      '{"metadata":{"type":"chatMessage","length":33,"keys":2},"payload":"{\\"id\\":1,\\"text\\":\\"Hello, world!\\"}"}';

    const decoded = wsflex.decode(rawMessage, true);

    expect(decoded).toEqual({
      id: 1,
      text: 'Hello, world!',
    });
  });

  it('throws an error when encoding with an invalid type', () => {
    type InvalidMessageData = { key: string };
    const wsflex = new WSFlex<InvalidMessageData>();
  
    expect(() => wsflex.encode('', { key: 'value' })).toThrow(
      'Message type must be a non-empty string.'
    );
  });  

  it('throws an error when decoding an invalid message', () => {
    const wsflex = new WSFlex();
    const invalidMessage = '{"invalidJson}';

    expect(() => wsflex.decode(invalidMessage)).toThrow('Failed to parse message');
  });

  it('throws an error when decoding a message with no metadata', () => {
    const wsflex = new WSFlex();
    const invalidMessage = '{"payload":"{\\"key\\":\\"value\\"}"}';

    expect(() => wsflex.decode(invalidMessage)).toThrow(
      'Invalid message format: metadata is missing or invalid.'
    );
  });

  it('throws an error when decoding a message with no payload', () => {
    const wsflex = new WSFlex();
    const invalidMessage = '{"metadata":{"type":"testMessage"}}';

    expect(() => wsflex.decode(invalidMessage)).toThrow(
      'Invalid message format: payload is missing or invalid.'
    );
  });
});
