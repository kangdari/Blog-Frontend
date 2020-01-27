import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';

const TagBoxContainer = () => {
    const dispatch = useDispatch();
    // write 모듈 스토어의 tags
    const tags = useSelector(state => state.write.tags);
    // const { tags } = useSelector(({ write }) => ({
    //     tags: write.tags,
    // }));

    const onChangeTags = nextTags => {
        dispatch(
            changeField({
                key: 'tags',
                value: nextTags,
            }),
        );
    };

    return <TagBox onChangeTags={onChangeTags} tags={tags}></TagBox>;
};

export default TagBoxContainer;
