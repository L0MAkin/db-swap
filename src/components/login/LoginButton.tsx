import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from '../shared/CustomButton';
import logo from '../../assets/images/near-logo.png';

import { nearEnv, fakeAuth } from '../../config/near-env';

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
        <CustomButton
            onClick={() => {
                authorize();
            }}
        >
            <div className="flex items-center space-x-3">
                <span>{t('buttons.login')}</span>
                <img src={logo} alt="near-icon" className="w-6" />
            </div>
        </CustomButton>
    );
}

export default LoginButton;
