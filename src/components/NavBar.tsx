import { useNearWallet } from 'react-near';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function ConnectButton({ text, onClick }: { text: string; onClick: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button type="button" onClick={onClick} className="border-2 p-2 rounded border-blue-500 bg-blue-200 text-white">
            {text}
        </button>
    );
}

function LoginButton() {
    const wallet = useNearWallet();
    const { t } = useTranslation();

    return (
        <ConnectButton
            text={t('buttons.login')}
            onClick={() => {
                wallet?.requestSignIn();
            }}
        />
    );
}

function LogoutButton() {
    const { t } = useTranslation();
    const wallet = useNearWallet();

    return (
        <ConnectButton
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
