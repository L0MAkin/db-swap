import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';

function LoginButton() {
    const wallet = useNearWallet();
    const { t } = useTranslation();

    return (
        <CustomButton
            onClick={() => {
                wallet?.requestSignIn();
            }}
        >
            {t('buttons.login')}
        </CustomButton>
    );
}

export default LoginButton;
