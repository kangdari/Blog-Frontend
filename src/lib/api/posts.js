import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) =>
    client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
    // JSON 형태로 쿼리 생성
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/posts?${queryString}`);
};
// 수정
export const updatePost = ({ id, title, body, tags }) =>
    client.patch(`/api/posts/${id}`, {
        title,
        body,
        tags,
    });
// 삭제
export const removePost = id => client.delete(`/api/posts/${id}`);
