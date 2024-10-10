import { ChunkrClient } from '../client';
import { FormData } from 'formdata-node';
import { FormDataEncoder } from 'form-data-encoder';
import * as fs from 'fs';
import path from 'path';
import { Blob } from 'buffer';

export class FilesResource {
    private client: ChunkrClient;

    constructor(client: ChunkrClient) {
        this.client = client;
    }

    async uploadFile(filePath: string, options: {
        model?: string,
        targetChunkLength?: number,
        ocrStrategy?: string
    } = {}): Promise<any> {
        const {
            model = 'HighQuality',
            targetChunkLength = 512,
            ocrStrategy = 'Auto'
        } = options;

        try {
            const fullPath = path.resolve(filePath);
            if (!fs.existsSync(fullPath)) {
                throw new Error(`File not found: ${fullPath}`);
            }

            const fileContent = await fs.promises.readFile(fullPath);
            const blob = new Blob([fileContent]);
            const form = new FormData();
            const fileName = path.basename(fullPath);

            form.set('file', blob, fileName);
            form.set('model', model);
            form.set('target_chunk_length', targetChunkLength.toString());
            form.set('ocr_strategy', ocrStrategy);

            const encoder = new FormDataEncoder(form);
            const chunks: Uint8Array[] = [];
            for await (const chunk of encoder.encode()) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            return this.client.request('/task', {
                method: 'POST',
                headers: encoder.headers,
                body: buffer,
            });
        } catch (error: any) {
            throw new Error(`Upload failed: ${error.message}`);
        }
    }
}