import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/posts/PostList';

const PostListContainer = ({ location }) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );
    useEffect(() => {
        const { page, username, tag } = qs.parse(location.search, {
            ignoreQueryPrefix: true,  // ? 생략 옵션
        });
        dispatch(listPosts({tag, username, page}));
    }, [dispatch, location.search]);


    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
        // showWriteButton props는 현재 로그인 중인 사용자의 정보를 지는 user 객체로 설정
        // user 객체가 유효할 때만 버튼이 나타남.
    );
};

export default withRouter(PostListContainer);
