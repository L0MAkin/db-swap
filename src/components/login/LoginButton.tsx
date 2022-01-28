import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from '../shared/CustomButton';
import logo from '../../assets/images/near-logo.png';
import { CONTRACT_ID } from '../../contracts/nearcrowd/useNearcrowdContract';

function LoginButton() {
    const wallet = useNearWallet()!;
    const { t } = useTranslation();

    return (
        <CustomButton
            onClick={() => {
                wallet.requestSignIn({
                    contractId: CONTRACT_ID
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
