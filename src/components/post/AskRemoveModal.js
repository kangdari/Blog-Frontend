import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <AskModal
            visible={visible}
            onCancel={onCancel}
            onConfirm={onConfirm}
            title='포스트 삭제'
            description='포스트를 정말 삭제하시겠습니까?'
        />
    );
};

export default AskRemoveModal;