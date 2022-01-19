import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginButton from '../login/LoginButton';
import AccountDropdown from '../account/AccountDropdown';
import { useWalletAuthorized } from '../../hooks/useWalletAuthorized';

const NAV_ITEMS = [
    {
        id: 1,
        to: '/tasksets',
        translationKey: 'navigation.tasksets',
        requireAuth: true
    },
    {
        id: 2,
        to: '/docs',
        translationKey: 'navigation.docs',
        requireAuth: false
    }
];

const Navbar: FC = () => {
    const { authorized } = useWalletAuthorized();
    const { t } = useTranslation();

    return (
        <nav className="p-4 bg-gray-800 flex items-center text-white justify-between">
            <ul className="flex items-center space-x-4">
                <li className="text-3xl mr-5">
                    <NavLink to="/">NEARCrowd</NavLink>
                </li>
                {NAV_ITEMS.map(({ id, to, translationKey, requireAuth }) => {
                    const Link = () => (
                        <NavLink to={to}>{t(translationKey)}</NavLink>
                    );

                    return (
                        <li key={id}>
                            {!requireAuth ? <Link /> : authorized && <Link />}
                        </li>
                    );
                })}
            </ul>

            {!authorized && <LoginButton />}

            {authorized && <AccountDropdown />}
        </nav>
    );
};

export default Navbar;
