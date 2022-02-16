const { REACT_APP_NEAR_ENV } = process.env;

class NearEnv {
    private readonly env: string;

    constructor() {
        this.env = REACT_APP_NEAR_ENV || 'testnet';
    }

    isSandbox() {
        return this.env === 'sandbox';
    }

    isTestNet() {
        return this.env === 'testnet';
    }

    isMainNet() {
        return this.env === 'mainnet';
    }
}

export const nearEnv = new NearEnv();
export * from './sandbox';
