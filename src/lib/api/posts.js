import client from './client';

export const writePost = ({ title, body, tags }) =>
    client.post('/api/post', { title, body, tags });
