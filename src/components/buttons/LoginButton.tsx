import { useNearWallet } from 'react-near';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';

function LoginButton() {
    const wallet = useNearWallet();
    const { t } = useTranslation();

    return (
        <CustomButton
            text={t('buttons.login')}
            onClick={() => {
                wallet?.requestSignIn();
            }}
        />
    );
}

export default LoginButton;
