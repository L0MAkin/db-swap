// eslint-disable-next-line import/named
import ky, { NormalizedOptions } from 'ky';
import { SDK } from './sdk';
import env from '../../config/env';
import { Account, transactions } from 'near-api-js';
import { CONTRACT_ID } from '../../contracts/nearcrowd/useNearcrowdContract';

type BeforeRequestHookOptionsWithJSONBody = NormalizedOptions & { json: object | undefined };

export class ClientAPI {
    private client;

    private clientWithNearAuth;

    private account: Account | null;

    constructor() {
        this.account = null;

        this.client = ky.create({
            prefixUrl: env.BACKEND_URL
        });

        this.clientWithNearAuth = this.client.extend({
            hooks: {
                beforeRequest: [
                    /**
                     * Body signature hook for authorization headers
                     */
                    async (request, options) => {
                        const { json } = options as BeforeRequestHookOptionsWithJSONBody;

                        if (!json) {
                            console.warn('Request body not provided. Signing empty request.', options);
                        }

                        const body = (json || {}) as object;

                        const { signature, publicKey, accountId } = await this.signRequestBody(body);

                        request.headers.set('Near-Auth-Account', accountId);
                        request.headers.set('Near-Auth-Signature', signature);
                        request.headers.set('Near-Auth-Public-Key', publicKey);
                    }
                ]
            }
        });
    }

    setAccount(account: Account) {
        this.account = account;
    }

    protected async signRequestBody(body: Uint8Array | object) {
        if (this.account === null) {
            throw Error('Can not sign body without defined account instance!');
        }

        const action = transactions.functionCall('api_request', body, 0, 0);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const [, signedTx] = await this.account.signTransaction(CONTRACT_ID, [action]);

        const sig = Buffer.from(signedTx.signature.data).toString('base64');
        console.log(sig, sig.length);

        console.log(signedTx.transaction.publicKey.toString());

        const accountId = signedTx.transaction.signerId;
        const signature = Buffer.from(signedTx.signature.data).toString('base64');
        const publicKey = signedTx.transaction.publicKey.toString();

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
