import { useTranslation } from 'react-i18next';
import { useNearWallet } from 'react-near';
import CustomButton from './CustomButton';

function LogoutButton() {
    const { t } = useTranslation();
    const wallet = useNearWallet();

    return (
        <CustomButton
            text={t('buttons.logout')}
            onClick={() => {
                // NOTE: this method only clears data from local storage
                // which does not make state changes or trigger updates
                wallet?.signOut();
                // HACK: refresh browser page
                window.location.reload();
            }}
        />
    );
}

export default LogoutButton;
