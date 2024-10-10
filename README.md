# Chunkr AI SDK

This SDK provides a convenient way to interact with the Chunkr AI API for document processing and analysis.

## Installation

To install the Chunkr AI SDK, use npm:

```bash
npm install chunkr-ai-sdk
```

## Usage

Here's a basic example of how to use the Chunkr AI SDK:

```typescript
import ChunkrAI from 'chunkr-ai-sdk';

async function main() {
  try {
    // Initialize the SDK with your API key
    const chunkr = new ChunkrAI('your-api-key');

    // Upload a file
    const uploadResponse = await chunkr.files.uploadFile('/path/to/your/file.pdf', {
      model: 'HighQuality',
      targetChunkLength: 512,
      ocrStrategy: 'Auto'
    });

    console.log('Upload response:', uploadResponse);

    // Get task status
    const taskStatus = await chunkr.getTask(uploadResponse.task_id);
    console.log('Task status:', taskStatus);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## API Reference

### `ChunkrAI`

The main class for interacting with the Chunkr AI API.

#### Constructor

- `new ChunkrAI(apiKey: string)`

#### Methods

- `getTask(taskId: string): Promise<any>`
  Get the status of a task.

### `files`

Property of `ChunkrAI` for file-related operations.

#### Methods

- `uploadFile(filePath: string, options?: { model?: string, targetChunkLength?: number, ocrStrategy?: string }): Promise<any>`
  Upload a file for processing.

## License

[MIT License](LICENSE)
