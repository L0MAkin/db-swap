import { KeyPair, keyStores } from 'near-api-js';
import React, { FC } from 'react';
import { NearEnvironment, NearProvider } from 'react-near';
import { nearEnv } from './index';

interface KeyPairFile {
    account_id: string;
    public_key: string;
    secret_key: string;
}

const { REACT_APP_NEAR_SANDBOX_KEYS } = process.env;

function keysFileContent(): KeyPairFile {
    if (!REACT_APP_NEAR_SANDBOX_KEYS) {
        return {
            account_id: '',
            public_key: '',
            secret_key: ''
        };
    }

    return JSON.parse(REACT_APP_NEAR_SANDBOX_KEYS);
}

export const config = {
    contractId: 'contract.test.near',
    accountId: keysFileContent().account_id
};

/**
 * Faking authorized wallet by placing public_key directly in local storage.
 */
export function fakeAuth() {
    const { account_id, public_key } = keysFileContent();

    localStorage.setItem(
        'null_wallet_auth_key',
        JSON.stringify({
            accountId: account_id,
            allKeys: [public_key]
        })
    );
}

function initKeyStore() {
    const { secret_key } = keysFileContent();

    const keyPair = KeyPair.fromString(secret_key);
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    keyStore.setKey('sandbox', 'test.near', keyPair);

    return keyStore;
}

export const NearProviderWithSandbox: FC = ({ children }) => {
    if (nearEnv.isSandbox()) {
        const deps = { keyStore: initKeyStore() };

        return (
            <NearProvider environment={NearEnvironment.Local} deps={deps} networkId={'sandbox'}>
                {children}
            </NearProvider>
        );
    }

    if (nearEnv.isMainNet()) {
        return <NearProvider environment={NearEnvironment.MainNet}>{children}</NearProvider>;
    }

    return <NearProvider environment={NearEnvironment.TestNet}>{children}</NearProvider>;
};
