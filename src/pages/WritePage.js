import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import Responsive from '../components/common/Responsive';
import WriteActionButtonsContainers from '../containers/write/WriteActionButtonsContainers'
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>글 작성하기 - REACTERS</title>
            </Helmet>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainers/>
        </Responsive>
    );
};

export default WritePage;