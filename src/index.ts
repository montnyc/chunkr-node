import { ChunkrClient } from './client';
import { FilesResource } from './resources/files';

export class ChunkrAI {
    private client: ChunkrClient;
    public files: FilesResource;

    constructor(apiKey: string) {
        this.client = new ChunkrClient(apiKey);
        this.files = new FilesResource(this.client);
    }

    async getTask(taskId: string): Promise<any> {
        return this.client.getTask(taskId);
    }
}

export default ChunkrAI;