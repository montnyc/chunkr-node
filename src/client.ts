import fetch, { RequestInit, Response } from 'node-fetch';
import { AbortController } from 'abort-controller';
import { HttpsAgent } from 'agentkeepalive';

export class ChunkrAIClient {
    private apiKey: string;
    private baseUrl: string;
    private keepAliveAgent: HttpsAgent;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('API key is required. Please obtain an API key from https://chunkr.ai/');
        }
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.chunkr.ai/api/v1';
        this.keepAliveAgent = new HttpsAgent();
    }

    public async request(
        endpoint: string,
        options: RequestInit = {},
        timeout: number = 30000
    ): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Authorization': `${this.apiKey}`,
            ...options.headers,
        };
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response: Response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal as any,
                agent: this.keepAliveAgent,
            });
            clearTimeout(timeoutId);

            const responseText = await response.text();

            if (!response.ok) {
                let errorMessage = `HTTP error! Status: ${response.status}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage += ` - ${errorData.message || responseText}`;
                } catch {
                    errorMessage += ` - ${responseText}`;
                }
                throw new Error(errorMessage);
            }

            if (responseText) {
                try {
                    return JSON.parse(responseText);
                } catch {
                    return responseText;
                }
            }
            return null;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async getTask(taskId: string): Promise<any> {
        return this.request(`/task/${taskId}`, { method: 'GET' });
    }

    async query(taskId: string, query: string): Promise<any> {
        return this.request(`/task/${taskId}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
    }
}