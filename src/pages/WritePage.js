import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import Responsive from '../components/common/Responsive';
import WriteActionButtonsContainers from '../containers/write/WriteActionButtonsContainers'

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainers/>
        </Responsive>
    );
};

export default WritePage;