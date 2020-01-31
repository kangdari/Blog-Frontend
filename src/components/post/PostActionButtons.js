import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
`;
const ActionButton = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: ${palette.gray[6]};
    font-weight: bold;
    border: none;
    outline none;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
        background: ${palette.gray[1]};
        color: ${palette.cyan[7]};
    }
    & + & {
        margin-left: 0.25rem;
    }
`;

// PostActionButtonsContainer로부터 props 전달받음
const PostActionButtons = ({ onEdit, onRemove }) => {
    // modal 창 
    const [modal, setModal] = useState(false);
    // 모달 창 on
    const onRemoveClick = () => {
        setModal(true)
    }
    // 모달 창 off
    const onCancel = () =>{
        setModal(false);
    }
    // 모달 창에서 삭제 클릭
    const onConfirm = () =>{
        setModal(false); // 모달 창 off
        onRemove(); // 포스트 삭제 API 호출
    }
    return (
        <>
            <PostActionButtonsBlock>
                <ActionButton onClick={onEdit}>수정</ActionButton>
                <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
            </PostActionButtonsBlock>
            <AskRemoveModal 
                visible={modal}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </>
    );
};

export default PostActionButtons;
