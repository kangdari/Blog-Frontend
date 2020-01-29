import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) =>
    client.post('/api/posts', { title, body, tags });

export const readPost = id => client(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
    // JSON 형태로 쿼리 생성
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/posts?${queryString}`);
};