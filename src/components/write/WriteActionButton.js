import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
`;

// TagBox 에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 설정
const StyleButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const WriteActionButton = ({ onCancel, onPublish }) => {
    return (
        <WriteActionButtonBlock>
            <StyleButton cyan onClick={onPublish}>
                포스트 등록
            </StyleButton>
            <StyleButton onClick={onCancel}>취소</StyleButton>
        </WriteActionButtonBlock>
    );
};

export default WriteActionButton;
