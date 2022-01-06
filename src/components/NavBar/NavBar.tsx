import { useNearWallet } from 'react-near';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../buttons/LogoutButton';
import LoginButton from '../buttons/LoginButton';

function NavBar() {
    const wallet = useNearWallet();
    const signedIn = wallet?.isSignedIn();

    return (
        <div className="flex justify-center items-center p-5 border-b-4">
            {signedIn && <NavLink to="/tasks">My Tasks</NavLink>}
            {signedIn && <NavLink to="/how-it-works">How it works</NavLink>}
            <div>{signedIn ? <LogoutButton /> : <LoginButton />}</div>
        </div>
    );
}

export default NavBar;
