import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../components/posts/Pagination';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
    const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS'],
    }));

    // 포스트 데이터가 없거나 로딩 중이라면 아무것도 안 보여줌.
    if (!posts || loading) return null;
    // 쿼리스트링에 page가 없으면 기본값은 1

    // console.log(match.params)
    // const username2 = match.params.username;

    const { tag, username, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return(
        <Pagination
            tag={tag}
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    )
};

export default withRouter(PaginationContainer);
