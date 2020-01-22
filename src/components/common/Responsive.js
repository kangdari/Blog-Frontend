import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;

    // 브라우저 크기에 따른 가로 크기 변경
    // 1024px 이하, 아이패드, 랩탑
    @media (max-width: 1024px) {
        widht: 768px;
    }
    // Mobile Device
    // 768px 이하
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Responsive = ({ children, ...rest }) => {
    // style, className, onClick 등의 props를 사용할 수 있도록
    // ...rest를 사용하여 ResponsiveBlock에게 전달
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
