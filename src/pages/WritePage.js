import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import TagBox from '../components/write/TagBox';
import Responsive from '../components/common/Responsive';
import WriteActionButton from '../components/write/WriteActionButton';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer/>
            <TagBox/>
            <WriteActionButton/>
        </Responsive>
    );
};

export default WritePage;