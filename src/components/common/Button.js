import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }

    ${props =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}

    ${props =>
        props.cyan &&
        css`
            background: ${palette.cyan[5]};
            &:hover {
                background: ${palette.cyan[4]};
            }
        `}
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

// Link 컴포넌트 직접 사용
const StyledLink = styled(Link)`
    ${buttonStyle}
`;

// Button 컴포넌트 내부에서 props.to 값에 따라 StyledLink, StyledButton 사용할지 결정됨.
// Header 컴포넌트에서 사용한 Button 컴포넌트는 to 속성이 존재하므로 StyledLink를 사용함.
// StyledLink를 사용하는 과정에서 props.cyan 값을 숫자 1, 0 으로 변환 해줌.
// 이는 styled() 함수로 감싸서 만든 컴포넌트의 경우 임의 props가 자동으로 필터링되지 않기 때문..
// Link에서 사용하는 a 태그에 boolean의 값이 임의 props로 설정되는 것을 허용 x 
// 숫자 / 문자열만 허용하기 때문에 숫자형으로 변환해줌.

// AuthForm 컴포넌트에서 사용한 Button 컴포넌트는 to 속성이 없으므로 StyledButton 사용
const Button = props => {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    );
};

export default Button;
