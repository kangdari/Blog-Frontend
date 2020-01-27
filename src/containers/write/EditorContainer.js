import React, { useCallback, useEffect } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { initialize, changeField } from '../../modules/write';

const EditorContainer = () => {
    const dispatch = useDispatch();
    // write 모듈의 상태 조회 = 리덕스 스토어에서 불러옴
    const { title, body } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
    }));
    const onChangeField = useCallback(
        // payload = { key, value }
        payload => dispatch(changeField(payload)),
        [dispatch],
    );
    // 언마운트될 때 초기화 = write 관련 상태 초기화
    useEffect(() => {
        // return = 언마운트
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body}></Editor>;
};

export default EditorContainer;
