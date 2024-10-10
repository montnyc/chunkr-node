import { ChunkrAIClient } from './client';
import { FilesResource } from './resources/files';
import { QueryResource } from './resources/query';

export class ChunkrAI {
    private client: ChunkrAIClient;
    public files: FilesResource;
    public query: QueryResource;

    constructor(apiKey: string) {
        this.client = new ChunkrAIClient(apiKey);
        this.files = new FilesResource(this.client);
        this.query = new QueryResource(this.client);
    }

    async getTask(taskId: string): Promise<any> {
        return this.client.getTask(taskId);
    }
}

export default ChunkrAI;