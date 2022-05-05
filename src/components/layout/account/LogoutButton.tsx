import { useTranslation } from 'react-i18next';
import { useNearWallet } from 'react-near';
import { LogoutIcon } from '@heroicons/react/outline';
import CustomButton from '../../shared/CustomButton';

function LogoutButton() {
    const { t } = useTranslation();
    const wallet = useNearWallet();

    return (
        <CustomButton
            onClick={() => {
                // NOTE: this method only clears data from local storage
                // which does not make state changes or trigger updates
                wallet?.signOut();
                // HACK: refresh browser page
                window.location.reload();
            }}
            className="flex items-center space-x-2"
        >
            <span>{t('buttons.logout')}</span>
            <LogoutIcon className="w-5 h-5" />
        </CustomButton>
    );
}

export default LogoutButton;
