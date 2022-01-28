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
        contents: '{ "kek": true }',
        createdAt: new Date(Date.now())
    }
];

export async function fetchTask(hash: string): Promise<TaskDTO> {
    await sleep(300);

    return TASKSET_MOCK_LIST[0];
}
