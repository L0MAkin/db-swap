import { FC } from 'react';
import styled from 'styled-components';
import bg from '../../assets/svg/bg.svg'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEFDEE;
    background-image: url(${bg});
    background-size: cover;
`

const PageLayout: FC = ({ children }) => {
    return (
        <Wrapper>
            <div className="h-screen flex flex-col">

                <main className="flex-1 h-max container p-2 mx-auto">{children}</main>
            </div>
        </Wrapper> 
    );
};

export default PageLayout;
