import { ChunkrAIClient } from '../client';

export class QueryResource {
    private client: ChunkrAIClient;

    constructor(client: ChunkrAIClient) {
        this.client = client;
    }

    async query(taskId: string, text: string): Promise<any> {
        return this.client.query(taskId, text);
    }
}