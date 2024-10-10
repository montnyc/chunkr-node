// test.ts

import ChunkrAI from '../src/index';

const apiKey = '';
const chunkr = new ChunkrAI(apiKey);

console.log('Starting...');
const taskStatus1 = await chunkr.getTask('');
console.log(taskStatus1);
// Upload a file

// const uploadResponse = await chunkr.files.uploadFile('', {
//     model: 'HighQuality',
//     targetChunkLength: 512,
//     ocrStrategy: 'Auto'
// });


// Get task status
// const taskStatus = await chunkr.getTask(uploadResponse.task_id);
