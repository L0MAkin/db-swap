import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';
import logo from '../../assets/near-logo.png';
import * as nearcrowd from '../../contracts/nearcrowd';

function LoginButton() {
    const wallet = useNearWallet()!;
    const { t } = useTranslation();

    return (
        <CustomButton
            onClick={() => {
                wallet.requestSignIn({
                    contractId: nearcrowd.CONTRACT_ID
                });
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
