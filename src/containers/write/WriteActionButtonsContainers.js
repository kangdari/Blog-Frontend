import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WriteActionButton from '../../components/write/WriteActionButton';
import { writePost, updatePost } from '../../modules/write';
import { withRouter } from 'react-router-dom';

const WriteActionButtonsContainers = ({ history }) => {
    const dispatch = useDispatch();
    // useSelector를 사용하여 write 리덕스 모듈의 상태를 조회
    const { title, body, tags, post, postError, originalPostId } = useSelector(
        ({ write }) => ({
            title: write.title,
            body: write.body,
            tags: write.tags,
            post: write.post,
            postError: write.postError,
            originalPostId: write.originalPostId,
        }),
    );

    // 포스트 등록
    // distpatch 함수를 사용해 write 모듈의 writePost 함수
    const onPublish = () => {
        // originalPostId 값이 존재하면 수정
        if (originalPostId) {
            dispatch(
                updatePost({
                    id: originalPostId,
                    title,
                    body,
                    tags,
                }),
            );
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };

    // 취소
    const onCancel = () => {
        history.goback();
    };

    // 성공 or 취소 시 작업
    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            // 페이지 이동
            history.push(`/@${user.username}/${_id}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);
    return <WriteActionButton onPublish={onPublish} onCancel={onCancel} isEdit={originalPostId} />;
};

export default withRouter(WriteActionButtonsContainers);
