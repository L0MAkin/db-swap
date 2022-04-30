import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
    font-weight: 600;
`

const { REACT_APP_NEAR_ENV } = process.env;
const contractId  = REACT_APP_NEAR_ENV === 'testnet' ? 'usdn.testnet' : 'usn'

function LoginButton() {
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
            </div>
        </LoginButtonContainer>
    );
}

export default LoginButton;
