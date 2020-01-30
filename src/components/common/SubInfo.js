import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
    // hasMarginTop 값이 여부에 따라 css 다르게 적용
    ${props =>
        props.hasMarginTop &&
        css`
            margin-top: 1rem;
        `}
    color: ${palette.gray[6]};
    // span 사이에 가운뎃점 문자 보여주기
    span + span:before {
        color: ${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const SubInfo = ({ username, publishDate, hasMarginTop }) => {
    return (
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    {/* <Link to={`/@${username}`}>{username}</Link> */}
                    <Link to={`/?username=${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(publishDate).toLocaleDateString()}</span>
        </SubInfoBlock>
    );
};

export default SubInfo;
