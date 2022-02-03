import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from '../shared/CustomButton';
import logo from '../../assets/images/near-logo.png';
import { CONTRACT_ID } from '../../contracts/nearcrowd/useNearcrowdContract';

import { nearEnv, fakeAuth } from '../../config/near-env';

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
                contractId: CONTRACT_ID
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
