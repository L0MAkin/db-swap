import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginButton from '../login/LoginButton';
import Dropdown from './account/Dropdown';
import { useAuthorized } from '../../hooks/useAuthorized';

const NAV_ITEMS = [
    {
        id: 1,
        to: '/docs',
        translationKey: 'navigation.docs',
        requireAuth: false
    },
    {
        id: 2,
        to: '/tasksets',
        translationKey: 'navigation.tasksets',
        requireAuth: true
    },
    {
        id: 3,
        to: '/assignment',
        translationKey: 'navigation.assignment',
        requireAuth: true
    }
];

const Navbar: FC = () => {
    const { authorized } = useAuthorized();
    const { t } = useTranslation();

    return (
        <nav className="p-4 bg-gray-800 flex items-center text-white justify-between">
            <ul className="flex items-center space-x-4">
                <li className="text-3xl mr-5">
                    <NavLink to="/">NEARCrowd</NavLink>
                </li>
                {/* {NAV_ITEMS.map(({ id, to, translationKey, requireAuth }) => {
                    const Link = () => <NavLink to={to}>{t(translationKey)}</NavLink>;

                    return <li key={id}>{!requireAuth ? <Link /> : authorized && <Link />}</li>;
                })} */}
            </ul>

            {!authorized && <LoginButton />}

            {authorized && <Dropdown />}
        </nav>
    );
};

export default Navbar;
