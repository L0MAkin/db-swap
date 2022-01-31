import { sleep } from '../../utils/sleep';

export interface TaskDTO {
    hash: string;

    /**
     * JSON containing task details
     */
    contents: string;

    /**
     * Task topic
     */
    // topic?: TopicDTO;

    createdAt: Date;
}

const TASKSET_MOCK_LIST: TaskDTO[] = [
    {
        hash: '123',
        contents: JSON.stringify({
            type: 'SingleImageDescriptionDev',
            data: {
                image: 'https://img-9gag-fun.9cache.com/photo/aeAznm5_460s.jpg'
            }
        }),
        createdAt: new Date(Date.now())
    }
];

export async function fetchTask(hash: string): Promise<TaskDTO> {
    console.error('fetching ', hash);
    await sleep(300);

    return TASKSET_MOCK_LIST[0];
}
