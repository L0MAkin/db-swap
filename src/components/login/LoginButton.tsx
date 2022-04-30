import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/near-logo.png';

import { nearEnv, fakeAuth } from '../../config/near-env';


const LoginButtonContainer = styled.div`
    width: 150px;
    background-color: #2A2A34;
    border: 2px solid #C1B582;
    color: #C1B583;
    border-radius: 0px;
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
`

const { REACT_APP_NEAR_ENV } = process.env;
const contractId  = REACT_APP_NEAR_ENV === 'testnet' ? 'usdn.testnet' : 'usn'

function LoginButton() {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

    const wallet = useNearWallet()!;
    const { t } = useTranslation();

    function authorize() {
        if (nearEnv.isSandbox()) {
            fakeAuth();
            // HACK: refresh browser page
            window.location.reload();
            return;
        }
       
        wallet
            .requestSignIn({
                contractId: contractId
            })
            .catch(console.error);
    }
    

    return (
        <LoginButtonContainer
            onClick={() => {
                authorize();
            }}
        >
            <div className="flex items-center space-x-3">
                <span>{t('buttons.login')}</span>
                {isDesktop ? ( <img src={logo} alt="near-icon" className="w-6" />) : null}
            </div>
        </LoginButtonContainer>
    );
}

export default LoginButton;
