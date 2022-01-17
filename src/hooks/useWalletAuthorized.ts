import { useNearWallet } from 'react-near';

export function useWalletAuthorized() {
    const wallet = useNearWallet();
    const authorized = wallet?.isSignedIn();

    return { authorized };
}
