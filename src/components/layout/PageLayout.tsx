import { FC } from 'react';
import styled from 'styled-components';
import bg from '../../assets/svg/bg.svg'
import { Footer } from '../main/components/Footer';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEFDEE;
    background-image: url(${bg});
    background-size: cover;

    main {
        margin-bottom: 30px;
    }

    @media (max-width:1024px) {
        background-size: contain;   
    }

    @media (max-width:768px) {
       main {
           margin-top: 55px;
           padding-bottom: 30px;
           margin-bottom: 0;
       } 
    }
`

const PageLayout: FC = ({ children }) => {
    return (
        <Wrapper>
            <div className="flex flex-col h-full">

                <main className="flex-1 h-max container p-2 mx-auto" >
                    {children}
                </main>
                <Footer />
            </div>
        </Wrapper> 
    );
};

export default PageLayout;
