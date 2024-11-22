
# **WSFlex**

A lightweight and flexible library for encoding and decoding WebSocket messages. WSFlex provides an easy way to structure, parse, and manage WebSocket messages with a custom, type-safe API.

---

## **Features**
- **Type-Safe**: Strong TypeScript support for safe and predictable message handling.
- **Customizable**: Easily define your own message schemas and formats.
- **Lightweight**: Minimal dependencies and simple API for quick integration.
- **Portable**: Modular design makes it easy to use across different backends and languages.

---

## **Installation**

Install the package via npm:

```bash
npm install wsflex
```

---

## **Usage**

### **1. Encoding Messages**

Create a WebSocket message with a type and data:

```typescript
import { WSFlex } from 'wsflex';

type ChatMessageData = {
  id: number;
  text: string;
};

const message = WSFlex.encode<ChatMessageData>('chatMessage', { id: 1, text: 'Hello, world!' });

console.log(message.toString());
// Output: '{"type":"chatMessage","data":{"id":1,"text":"Hello, world!"}}'
```

---

### **2. Decoding Messages**

Parse a raw JSON string into a structured message:

```typescript
import { WSFlex } from 'wsflex';

type ChatMessageData = {
  id: number;
  text: string;
};

const rawMessage = '{"type":"chatMessage","data":{"id":1,"text":"Hello, world!"}}';

const decodedMessage = WSFlex.decode<ChatMessageData>(rawMessage);

console.log(decodedMessage.toJson());
// Output: { type: 'chatMessage', data: { id: 1, text: 'Hello, world!' } }
```

---

### **3. Accessing Message Data**

Easily access message type and data:

```typescript
import { WSFlex } from 'wsflex';

type AuthMessageData = {
  token: string;
};

const message = WSFlex.encode<AuthMessageData>('authMessage', { token: 'abcdef' });

console.log(message.type); // Output: 'authMessage'
console.log(message.data.token); // Output: 'abcdef'
```

---

## **API Reference**

### **`WSFlex.encode<T>(type: string, data: T): WSFlexMessage<T>`**
Encodes a message into a `WSFlexMessage` object.

- **Parameters**:
  - `type`: A string representing the message type (e.g., `chatMessage`).
  - `data`: A TypeScript object representing the message data.
- **Returns**: A `WSFlexMessage` instance.

---

### **`WSFlex.decode<T>(rawMessage: string): WSFlexMessage<T>`**
Decodes a raw JSON string into a `WSFlexMessage` object.

- **Parameters**:
  - `rawMessage`: A JSON string containing the message type and data.
- **Returns**: A `WSFlexMessage` instance.
- **Throws**: Error if the message format is invalid.

---

### **`WSFlexMessage` Class**
A class representing a WebSocket message.

- **Methods**:
  - `.toString()`: Converts the message to a JSON string.
  - `.toJson()`: Returns the raw JSON object as `{ type: string; data: T }`.

---

## **Contributing**
Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/robertarnorsson/wsflex).

---

## **License**
This project is licensed under the [Apache License](LICENSE).

---
