import ky from 'ky';
import { SDK } from './sdk';
import env from '../../config/env';

class ClientAPI {
    private client;

    private clientWithNearAuth;

    constructor() {
        this.client = ky.create({
            prefixUrl: env.BACKEND_URL
        });

        // TODO: load from wallet
        this.clientWithNearAuth = this.client.extend({
            headers: {
                'Near-Auth-Signature':
                    'LIlpuBBUlTIhiQWN+isrDGeMGSVquxBTyswhcPqKjNkfveySU1ka74L2GUHj7ulZg7hyftI6AQTs9utKsivmDQ==',
                'Near-Auth-Public-Key': 'ed25519:FBCKrwBeg7ZGca4rbLfjD6b1m7VXMUyQJ67bHDoDdkQ5',
                'Near-Auth-Account': 'test.near'
            }
        });
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
        console.log({ taskHash, solutionData });

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

export const api = new ClientAPI();
