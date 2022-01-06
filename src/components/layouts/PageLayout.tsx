import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../buttons/LogoutButton';
import LoginButton from '../buttons/LoginButton';

const PageLayout: FC = ({ children }) => {
    const wallet = useNearWallet();
    const authorized = wallet?.isSignedIn();

    // const navigate = useNavigate();
    // if (wallet && !wallet.isSignedIn()) {
    //     navigate('/');
    // }

    return (
        <div className="h-screen flex flex-col">
            <nav className="p-4 bg-gray-800 flex items-center space-x-3">
                {authorized && <NavLink to="/tasks">My Tasks</NavLink>}
                {authorized && <NavLink to="/docs">How it works</NavLink>}

                <div>{authorized ? <LogoutButton /> : <LoginButton />}</div>
            </nav>

            <main className="flex-1">
                <div>{children}</div>
            </main>
        </div>
    );
};

export default PageLayout;
