import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;
const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;
const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    // 맨 위 포스트는 padding-top 없음
    &:first-child {
        padding-topd: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const PostItem = ({ post }) => {
    const { title, user, tags, publishDate, body, _id } = post;
    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo username={user.username} publishDate={publishDate} />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemBlock>
    );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
    if (error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }
    return (
        <PostListBlock>
            {/* showWriteButton(user) 값이 유효할 때만 버튼이 보임 */}
            {showWriteButton && (
                <WritePostButtonWrapper>
                    <Button cyan to="/write">
                        새 글 작성
                    </Button>
                </WritePostButtonWrapper>
            )}
            {/* 로딩중이 아니고 포스트 배열이 존재할 때만 보여 줌. */}
            {!loading && posts && (
                <div>
                    {posts.map(post => (
                        <PostItem post={post} key={post.id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;
