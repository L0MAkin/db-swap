import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { NavLink } from 'react-router-dom';
import LoginButton from '../buttons/LoginButton';
import { useTranslation } from 'react-i18next';
import AccountDropdown from '../account/AccountDropdown';

const NAV_ITEMS = [
    {
        id: 1,
        to: '/task-sets',
        translationKey: 'navigation.tasks',
        requireAuth: true
    },
    {
        id: 2,
        to: '/docs',
        translationKey: 'navigation.docs',
        requireAuth: false
    }
];

const PageLayout: FC = ({ children }) => {
    const wallet = useNearWallet();
    const authorized = wallet?.isSignedIn();
    const { t } = useTranslation();

    return (
        <div className="h-screen flex flex-col">
            <nav className="p-4 bg-gray-800 flex items-center text-white justify-between">
                <ul className="flex items-center space-x-4">
                    {NAV_ITEMS.map(({ id, to, translationKey }) => (
                        <li key={id}>
                            {authorized && (
                                <NavLink to={to}>{t(translationKey)}</NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                {!authorized && <LoginButton />}

                {authorized && <AccountDropdown />}
            </nav>

            <main className="flex-1 h-max container p-6">{children}</main>
        </div>
    );
};

export default PageLayout;
