// Import the WSFlex class and necessary types
import { WSFlex } from '../src/parser';

// Define the type of data you want to encode and decode
type ChatMessageData = {
  id: number; // Unique ID for the message
  text: string; // Content of the chat message
};

// Create a new WSFlex instance with the default JSON encoder
const wsflex = new WSFlex<ChatMessageData>();

// Encode a chat message
const encoded = wsflex.encode('chatMessage', { id: 1, text: 'Hello, world!' });
console.log('Encoded Message:', encoded);
// Output: {"metadata":{"type":"chatMessage","length":33,"keys":2},"payload":"{\"id\":1,\"text\":\"Hello, world!\"}"}

// Decode the message with metadata
const decodedWithMetadata = wsflex.decode(encoded);
console.log('Decoded with Metadata:', decodedWithMetadata);
// Output:
// {
//   metadata: { type: 'chatMessage', length: 33, keys: 2 },
//   data: { id: 1, text: 'Hello, world!' }
// }

// Decode the message without metadata
const decodedWithoutMetadata = wsflex.decode(encoded, true);
console.log('Decoded without Metadata:', decodedWithoutMetadata);
// Output: { id: 1, text: 'Hello, world!' }
