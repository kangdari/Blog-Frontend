import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import Responsive from '../components/common/Responsive';
import WriteActionButton from '../components/write/WriteActionButton';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButton/>
        </Responsive>
    );
};

export default WritePage;