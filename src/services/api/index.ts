import { WalletConnection } from 'near-api-js';
import ky from 'ky';

import { SDK } from './sdk';
import env from '../../config/env';

export class ClientAPI {
    private client;

    private clientWithNearAuth;

    public wallet: WalletConnection | null;

    constructor() {
        this.wallet = null;

        this.client = ky.create({
            prefixUrl: env.BACKEND_URL
        });

        this.clientWithNearAuth = this.client.extend({
            hooks: {
                beforeRequest: [
                    /**
                     * Body signature hook for authorization headers
                     */
                    async (request, { body }) => {
                        if (this.wallet === null) {
                            throw Error('WalletConnection is null. Can not sign body without keyPair.');
                        }

                        if (typeof body !== 'string') {
                            throw Error('Request body should be typeof string.');
                        }

                        const { signature, publicKey, accountId } = await this.signRequestBody(body);

                        request.headers.set('Near-Auth-Account', accountId);
                        request.headers.set('Near-Auth-Public-Key', publicKey.toString());
                        request.headers.set('Near-Auth-Signature', Buffer.from(signature).toString('base64'));
                    }
                ]
            }
        });
    }

    protected async signRequestBody(body: string) {
        const message = Buffer.from(body);

        const networkId = this.wallet!._networkId;
        const accountId = this.wallet!.getAccountId() as string;

        const keyPair = await this.wallet!._keyStore.getKey(networkId, accountId);

        const { signature, publicKey } = keyPair.sign(message);

        return { accountId, signature, publicKey };
    }

    getTaskByHash(hash: string) {
        return this.client.get(`tasks/${hash}`).json<SDK.Task>();
    }

    getAllTopics() {
        return this.client.get('topics').json<SDK.Topic[]>();
    }

    getTopicById(id: number) {
        return this.client.get(`topics/${id}`).json<SDK.Topic>();
    }

    submitSolution(taskHash: string, solutionData: object) {
        return this.clientWithNearAuth
            .post('solutions', {
                json: {
                    taskHash,
                    content: JSON.stringify(solutionData)
                }
            })
            .json<SDK.Solution>();
    }
}
