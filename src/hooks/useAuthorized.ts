import { useNearWallet } from 'react-near';

export function useAuthorized() {
    const wallet = useNearWallet();
    const authorized = wallet && wallet.isSignedIn();

    return { authorized };
}
