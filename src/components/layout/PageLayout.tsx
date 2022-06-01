import { FC } from 'react';
import styled from 'styled-components';
import bg from '../../assets/svg/bg.svg'
import { Footer } from '../main/components/Footer';

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    background-color: #FEFDEE;
    background-image: url(${bg});
    background-size: cover;

    @media (max-width:1024px) {
        background-size: contain;   
    }

    @media (max-width:768px) {
       main {
           margin-top: 55px;
       } 
    }
`

const PageLayout: FC = ({ children }) => {
    return (
        <Wrapper>
            <div className="flex flex-col h-full">

                <main className="flex-1 h-max container p-2 mx-auto" style={{marginBottom: 30}}>
                    {children}
                </main>
                <Footer />
            </div>
        </Wrapper> 
    );
};

export default PageLayout;
