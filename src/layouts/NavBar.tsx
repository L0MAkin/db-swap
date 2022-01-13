import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginButton from '../components/login/LoginButton';
import AccountDropdown from '../components/account/AccountDropdown';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';

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

const NavBar: FC = () => {
    const { authorized } = useWalletAuthorized();
    const { t } = useTranslation();

    return (
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
    );
};

export default NavBar;
